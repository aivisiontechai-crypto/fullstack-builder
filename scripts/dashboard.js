#!/usr/bin/env node
// Local live-status dashboard for a fullstack-builder run. READ-ONLY: derives
// state from artifacts the pipeline already writes (prd.json, progress.txt,
// TELEMETRY.jsonl, docs/*, git). Never writes/wraps project files.
// Usage: node scripts/dashboard.js <project-dir> [port]
const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const projectDir = process.argv[2] || ".";
let portWanted = parseInt(process.argv[3] || "3420", 10);
const STALE_MS = (parseInt(process.env.FB_STALE_SECONDS || "900", 10) || 900) * 1000;
if (!Number.isInteger(portWanted)) {
  console.error("usage: node scripts/dashboard.js <project-dir> [port]  (stall threshold: env FB_STALE_SECONDS, default 900)");
  process.exit(2);
}

// Resume probe (async): if a dashboard for this project is already running
// (recorded in <project>/.dashboard-url), tell the user where it is instead
// of spawning a duplicate. If the record is stale (port free), restart on
// the SAME port so the URL is stable across stops/resumes.
function start() {
  let done = false;
  const finish = (port) => { if (done) return; done = true; serve(port); };
  const urlFile = path.join(projectDir, ".dashboard-url");
  if (fs.existsSync(urlFile)) {
    let rec;
    try { rec = JSON.parse(fs.readFileSync(urlFile, "utf8")); } catch {}
    if (rec && rec.port) {
      const req = http.request({ port: rec.port, path: "/api/status", method: "GET", timeout: 700 }, (res) => {
        res.resume();
        res.on("close", () => {
          console.log(`dashboard: already running at ${rec.url}  (from ${urlFile})`);
          process.exit(0);
        });
      });
      req.on("error", () => finish(rec.port));
      req.on("timeout", () => { req.destroy(); finish(rec.port); });
      req.end();
      return;
    }
  }
  finish(portWanted);
}
start();

const read = (rel, { join = `.${path.sep}` } = {}) => {
  try {
    return fs.readFileSync(path.join(projectDir, rel), "utf8");
  } catch {
    return null;
  }
};
const readJsonLines = (rel) =>
  (read(rel) || "").split("\n").filter(Boolean).map((l) => {
    try {
      return JSON.parse(l);
    } catch {
      return null;
    }
  }).filter(Boolean);

const parsePrd = () => {
  const raw = read("prd.json");
  if (!raw) return null;
  try {
    const p = JSON.parse(raw);
    return Array.isArray(p.stories) ? p.stories : Array.isArray(p) ? p : null;
  } catch {
    return null;
  }
};

const gitLog = (n = 8) => {
  try {
    return execFileSync("git", ["-C", projectDir, "log", "--oneline", `-${n}`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
};

const gitLastCommitTs = () => {
  try {
    return parseInt(
      execFileSync("git", ["-C", projectDir, "log", "-1", "--format=%ct"], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim(),
      10
    );
  } catch {
    return null;
  }
};

const walk = (dir, out, base) => {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(p, out, base);
    } else if (e.name.endsWith(".md")) {
      let m = null;
      try {
        m = fs.statSync(p).mtimeMs;
      } catch {}
      out.push({ path: path.relative(base, p), mtime: m ? new Date(m).toISOString() : null });
    }
  }
};
const docStatus = () => {
  const out = [];
  walk(path.join(projectDir, "docs"), out, projectDir);
  return out.sort((a, b) => (a.path < b.path ? -1 : 1));
};
const rootArtifacts = () => {
  const out = [];
  for (const f of ["prd.json", "progress.txt", "TELEMETRY.jsonl", ".run-model", "docs/README.md", "docs/PROJECT_STATUS.md"]) {
    let m = null;
    try {
      m = fs.statSync(path.join(projectDir, f)).mtimeMs;
    } catch {}
    if (m) out.push({ path: f, mtime: new Date(m).toISOString() });
  }
  return out;
};

const appIdentity = () => {
  const abs = path.resolve(projectDir);
  const dirBase = path.basename(abs);
  // Extract a real product title from a doc's first "# ..." heading, stripping
  // a leading document-label like "BRIEF.md — Evolv run dashboard".
  // Start with NO name until BRIEF.md / PRD.md / package.json actually exists.
  const titleFromDoc = (text) => {
    if (!text) return "";
    const m = text.match(/^#\s+(.+?)\s*$/m);
    if (!m) return "";
    let t = m[1].trim();
    t = t.replace(/^\s*(BRIEF\.md|PRD\.md|BRD\.md|SCOPE\.md|ARCHITECTURE\.md|DESIGN\.md)\s*[—–-]\s*/i, "");
    if (/^(BRIEF\.md|PRD\.md|BRD\.md|SCOPE\.md|ARCHITECTURE\.md|DESIGN\.md)$/i.test(t.trim())) return "";
    return t;
  };
  let name = titleFromDoc(read("docs/BRIEF.md")) || titleFromDoc(read("docs/PRD.md"));
  if (!name) {
    const pkg = read("package.json");
    if (pkg) {
      try {
        name = JSON.parse(pkg).name || "";
      } catch {}
    }
  }
  // no folder-name fallback: the user wants no name until a real one exists
  let h = 0;
  for (const c of abs) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return { name, dirBase, abs, hue: h % 360 };
};

const aiSummary = () => {
  const telPath = path.join(projectDir, "TELEMETRY.jsonl");
  // Real runs log v1 (no token fields); v2 adds tokens_in/tokens_out/cost_usd.
  // The supervisor migrates on mismatch, but the dashboard must show real
  // numbers itself — so it runs the same migration if telemetry is v1.
  if (fs.existsSync(telPath)) {
    const raw = read("TELEMETRY.jsonl") || "";
    const maxV = raw.split("\n").filter(Boolean).reduce((m, l) => {
      try { return Math.max(m, JSON.parse(l).v || 0); } catch { return m; }
    }, 0);
    if (maxV < 2) {
      try {
        execFileSync("node", [path.join(__dirname, "telemetry-migrate.js"), telPath, "1", "2"], {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"],
        });
      } catch (e) {
        // migration failure must never break the dashboard; fall back to 0s
      }
    }
  }
  let tel = readJsonLines("TELEMETRY.jsonl");
  let model = "", modelSource = "";
  const rm = read(".run-model");
  if (rm) {
    try {
      const j = JSON.parse(rm);
      model = j.model || "";
      modelSource = j.source || "";
    } catch {}
  }
  let tokens_in = 0, tokens_out = 0, cost = 0, calls = 0;
  const bySkill = {};
  const models = {};
  for (const t of tel) {
    calls++;
    const s = t.skill || "unknown";
    const d = bySkill[s] || { skill: s, calls: 0, tokens_in: 0, tokens_out: 0, cost: 0, last: t.ts || "" };
    d.calls++;
    d.tokens_in += Number(t.tokens_in) || 0;
    d.tokens_out += Number(t.tokens_out) || 0;
    d.cost += Number(t.cost_usd) || 0;
    if (t.ts && (!d.last || t.ts > d.last)) d.last = t.ts;
    bySkill[s] = d;
    tokens_in += Number(t.tokens_in) || 0;
    tokens_out += Number(t.tokens_out) || 0;
    cost += Number(t.cost_usd) || 0;
    const m = t.model || "";
    if (m) {
      const e = models[m] || { model: m, calls: 0, tokens_in: 0, tokens_out: 0, cost: 0 };
      e.calls++;
      e.tokens_in += Number(t.tokens_in) || 0;
      e.tokens_out += Number(t.tokens_out) || 0;
      e.cost += Number(t.cost_usd) || 0;
      models[m] = e;
    }
  }
  if (!model) {
    const arr = Object.values(models);
    if (arr.length) {
      const top = arr.reduce((a, b) => (b.calls > (a ? a.calls : 0) ? b : a), null);
      if (top) {
        model = top.model;
        modelSource = "telemetry (most-used)";
      }
    }
  }
  const top = Object.values(bySkill)
    .sort((a, b) => b.calls - a.calls)
    .slice(0, 6);
  return {
    model,
    modelSource,
    tokens_in,
    tokens_out,
    tokens: tokens_in + tokens_out,
    cost: Math.round(cost * 100) / 100,
    calls,
    noTokenData: calls > 0 && tokens_in === 0 && tokens_out === 0,
    skills: top.map((d) => ({
      skill: d.skill,
      calls: d.calls,
      tokens: d.tokens_in + d.tokens_out,
      cost: Math.round(d.cost * 100) / 100,
      last: d.last,
    })),
    hasTelemetry: tel.length > 0,
  };
};

const status = () => {
  const stories = parsePrd();
  const progress = readJsonLines("progress.txt").slice(-1)[0] || null;
  const telemetry = readJsonLines("TELEMETRY.jsonl");
  const recent = telemetry
    .slice(-120)
    .reverse()
    .map((t) => ({ ...t, ts: t.ts || null }));
  const passed = (stories || []).filter((s) => s.passes === true).length;
  const total = (stories || []).length;
  const commits = gitLog();
  const telTs = telemetry.length ? Date.parse(telemetry[telemetry.length - 1].ts || "NaN") || 0 : 0;
  const commitTs = (gitLastCommitTs() || 0) * 1000;
  const lastActivity = Math.max(telTs, commitTs);
  const now = Date.now();
  const started = total > 0 || lastActivity > 0;
  const activitySecs = lastActivity ? Math.round((now - lastActivity) / 1000) : null;
  const stalled = started && activitySecs !== null && activitySecs * 1000 > STALE_MS;
  let control = null;
  const ctl = read(CONTROL_FILE);
  if (ctl) {
    try {
      control = JSON.parse(ctl);
    } catch {}
  }
  const identity = appIdentity();
  const ai = aiSummary();
  return {
    project: identity.dirBase,
    appName: identity.name,
    appPath: identity.abs,
    hue: identity.hue,
    ts: new Date().toISOString(),
    phase: progress && progress.last_completed ? "build (ralph loop)" : total ? "build (prep/planning)" : "pre-build (planning)",
    started,
    stalled,
    activity_secs: activitySecs,
    stale_mins: Math.round(STALE_MS / 60000),
    last_activity_iso: lastActivity ? new Date(lastActivity).toISOString() : null,
    control,
    model: ai.model,
    modelSource: ai.modelSource,
    tokens_in: ai.tokens_in,
    tokens_out: ai.tokens_out,
    tokens: ai.tokens,
    cost: ai.cost,
    calls: ai.calls,
    skills: ai.skills,
    hasTelemetry: ai.hasTelemetry,
    stories: stories
      ? (stories || []).map((s) => ({
          id: s.id || "?",
          title: s.title || "",
          passes: s.passes === true,
          deps: (s.depends_on || []).length,
          acs: (s.acceptance_criteria || []).length,
          spec: s.spec_requirement || s.requirement || "",
          principle: s.constitution_principle || "",
        }))
      : null,
    total,
    passed,
    pct: total ? Math.round((passed / total) * 100) : 0,
    last_completed: progress ? progress.last_completed : null,
    blocked: progress ? progress.blocked || [] : [],
    deferred: progress ? progress.deferred || [] : [],
    recent,
    telemetry_misses: telemetry.filter((t) => t.success === false).length,
    docs: docStatus(),
    rootArtifacts: rootArtifacts(),
    commits,
  };
};

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>fullstack-builder run dashboard</title>
<style>
:root{color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0d1117;color:#e6edf3;padding:24px}
h1{font-size:20px;margin:0 0 4px}
h2{font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#8b949e;margin:24px 0 8px}
.meta{color:#8b949e;font-size:13px;margin-bottom:16px}
.card{background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;margin-bottom:16px}
.bar{background:#21262d;border-radius:6px;height:10px;overflow:hidden}
.bar>div{background:#3fb950;height:100%;transition:width .4s}
.grid{display:flex;gap:24px;flex-wrap:wrap}
.stat{flex:1;min-width:120px}.stat b{font-size:26px;display:block}.stat span{color:#8b949e;font-size:12px}
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{text-align:left;padding:6px 8px;border-bottom:1px solid #21262d}
th{color:#8b949e;font-weight:600}
td.mono,pre,code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.ok{color:#3fb950}.bad{color:#f85149}.dim{color:#8b949e}
.pill{display:inline-block;padding:1px 8px;border-radius:999px;font-size:12px;border:1px solid #30363d;margin:2px 2px 0 0}
.pill.yes{color:#3fb950;border-color:#238636}.pill.no{color:#f85149;border-color:#f85149}
.path.mono{color:#8b949e;font-size:12px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;word-break:break-all;margin-bottom:6px}
.banner{border-radius:8px;padding:12px 16px;margin-bottom:16px;font-weight:600}
.banner.live{background:#12261e;border:1px solid #238636;color:#3fb950}
.banner.wait{background:#1f1c12;border:1px solid #9e6a03;color:#d29922}
.banner.stall{background:#2d1517;border:1px solid #f85149;color:#f85149}
.ctl{border:1px solid #30363d;background:#21262d;color:#e6edf3;border-radius:6px;padding:6px 12px;font-size:13px;cursor:pointer}
.ctl:hover{background:#30363d}.ctl.danger{border-color:#f85149;color:#f85149}.ctl.danger:hover{background:#3d1d20}
#events{max-height:360px;overflow:auto}
</style></head><body>
<h1><span id="appName">—</span> <span class="dim">run dashboard</span></h1>
<div class="path mono" id="appPath">—</div>
<div class="meta" id="meta">—</div>
<div class="card"><h2 style="margin-top:0">Control</h2>
<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
<button id="btnPause" class="ctl">Pause run</button>
<button id="btnStop" class="ctl danger">Stop run</button>
<span id="ctlState" class="dim"></span>
</div>
<p class="dim" style="margin:8px 0 0;font-size:12px">Stop/pause kills the ralph supervisor (SIGTERM).
Resume anytime with <code>--budget-resume</code> — last completed story is the resume point. No data loss beyond the in-flight story.</p>
<p class="dim" style="margin:6px 0 0;font-size:12px">To restart the build from here: <code>node &lt;skill-dir&gt;/scripts/resume.js &lt;project-dir&gt; --budget-resume</code> (or just re-run <code>/fullstack-builder</code> — it auto-detects and resumes).</p></div>
<div class="card"><h2 style="margin-top:0">AI / Tokens</h2>
<div class="grid" style="gap:12px">
  <div class="stat"><b id="model" class="dim">—</b><span>model in use (source: <span id="modelSrc">—</span>)</span></div>
  <div class="stat"><b id="tokens" class="dim">0</b><span>tokens consumed (in + out)</span></div>
  <div class="stat"><b id="calls" class="dim">0</b><span>skill calls logged</span></div>
  <div class="stat"><b id="cost" class="dim">$0</b><span>cost (from TELEMETRY cost_usd)</span></div>
</div>
<div style="overflow-x:auto"><table id="skillTable"><tr><th>Skill</th><th>Calls</th><th>Tokens</th><th>Cost</th><th>Last used</th></tr></table></div>
<p class="dim" style="margin:8px 0 0;font-size:12px">Tokens/cost are summed from <code>TELEMETRY.jsonl</code> (v2 schema: tokens_in / tokens_out / cost_usd). The model is read from <code>.run-model</code> (written by the skill at run start) or, if absent, from the most-used <code>model</code> field in telemetry.</p></div>
<div id="banner" class="banner wait">waiting for run to start…</div>
<div class="grid">
  <div class="stat"><b id="pct">0%</b><span>stories passing</span></div>
  <div class="stat"><b id="n">0/0</b><span>passed / total</span></div>
  <div class="stat"><b id="miss" class="ok">0</b><span>telemetry failures</span></div>
  <div class="stat"><b id="commits">0</b><span>commits (last 8 shown)</span></div>
</div>
<div class="card"><div class="bar"><div id="bar" style="width:0%"></div></div>
<p id="status" style="margin:8px 0 0;font-size:13px">—</p></div>
<div class="card"><h2 style="margin-top:0">Stories</h2>
<div style="overflow-x:auto"><table id="stories"><tr><th>ID</th><th>Title</th><th>Spec</th><th>Principle</th><th>ACs</th><th>Deps</th><th>Pass</th></tr></table></div></div>
<div class="grid">
<div class="card" style="flex:1;min-width:320px"><h2 style="margin-top:0">Live events (TELEMETRY.jsonl)</h2>
<div id="events" class="mono" style="font-size:12px">—</div></div>
<div class="card" style="flex:1;min-width:320px"><h2 style="margin-top:0">Artifacts</h2>
<div style="margin-bottom:10px"><div class="dim" style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">root</div>
<div id="root"></div></div>
<div><div class="dim" style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">docs/ (recursive)</div>
<div id="docs"></div></div>
<h2>Git</h2>
<div id="git" class="mono" style="font-size:12px">—</div></div>
</div>
<script>
const render=(s)=>{
    const age=(iso)=>{if(!iso)return"never";const d=new Date(iso).getTime();const s=Math.round((Date.now()-d)/1000);if(s<60)return s+"s";if(s<3600)return Math.round(s/60)+"m";if(s<86400)return Math.round(s/3600)+"h";return Math.round(s/86400)+"d";};
    const pill=(p,m)=>{const el=document.createElement("span");el.className="pill yes";el.textContent=p+(m?" · "+age(m):"");el.title=m||"";return el};
    const fmt=new Date(s.ts).toLocaleTimeString();
    const bn=document.getElementById("banner");
    if(!s.started){bn.textContent="waiting for run to start…";bn.className="banner wait";}
    else if(s.stalled){bn.textContent="STALLED — no activity for "+s.activity_secs+"s (threshold "+s.stale_mins+" min). Agent likely stuck/killed. Last activity: "+s.last_activity_iso+" — resume with --budget-resume when ready.";bn.className="banner stall";}
    else{bn.textContent="LIVE — last activity "+s.activity_secs+"s ago ("+s.last_activity_iso+")";bn.className="banner live";}
    const nm=document.getElementById("appName");nm.textContent=s.appName||"—";nm.style.color=s.hue!=null?("hsl("+s.hue+",70%,60%)"):"";
    document.getElementById("appPath").textContent=s.appPath||"";
    document.title=(s.appName||"dashboard")+" · run dashboard";
    document.getElementById("meta").textContent=s.project+" · "+s.phase+" · updated "+fmt;
    document.getElementById("pct").textContent=s.pct+"%";
    document.getElementById("n").textContent=s.passed+"/"+s.total;
    document.getElementById("bar").style.width=s.pct+"%";
    const m=document.getElementById("miss");m.textContent=s.telemetry_misses;m.className=s.telemetry_misses?"bad":"ok";
    document.getElementById("commits").textContent=s.commits.length;
    const line=s.last_completed?("last completed: "+s.last_completed):"no story completed yet";
    const blk=s.blocked.length?(" · blocked: "+s.blocked.join(", ")):"";
    const def=s.deferred.length?(" · deferred: "+s.deferred.join(", ")):"";
    document.getElementById("status").textContent=line+blk+def;
    if(s.control){const cs=document.getElementById("ctlState");cs.textContent="CONTROL REQUESTED: "+s.control.action+" @ "+(s.control.ts||"").replace("T"," ").slice(0,19)+" — watchdog acts within ~2s";cs.className="bad";}
    const mdl=document.getElementById("model");mdl.textContent=s.model||"—";mdl.className="dim";
    document.getElementById("modelSrc").textContent=s.modelSource||"—";
    document.getElementById("tokens").textContent=(s.tokens||0).toLocaleString();
    const tok=document.getElementById("tokens");
    if(s.noTokenData){tok.textContent="no token data";tok.className="dim";tok.title="host doesn't expose token counts — pass 0 to telemetry-write.js or the dashboard shows this instead of a fake 0";}else{tok.textContent=(s.tokens||0).toLocaleString();tok.className="dim";}
    document.getElementById("calls").textContent=(s.calls||0).toLocaleString();
    document.getElementById("cost").textContent="$"+(s.cost||0).toLocaleString();
    const st=document.getElementById("skillTable");
    while(st.rows.length>1)st.deleteRow(1);
    (s.skills||[]).forEach(d=>{const r=st.insertRow();
      [d.skill,String(d.calls),(d.tokens||0).toLocaleString(),"$"+(d.cost||0).toLocaleString(),d.last||""].forEach(v=>{const c=r.insertCell();c.textContent=v});});
    const tab=document.getElementById("stories");
    while(tab.rows.length>1)tab.deleteRow(1);
    (s.stories||[]).forEach(st=>{const r=tab.insertRow();
      [st.id,st.title,st.spec,st.principle,String(st.acs),String(st.deps)].forEach((v,i)=>{const c=r.insertCell();c.textContent=v});
      const c=r.insertCell();c.textContent=st.passes?"PASS":"pending";c.className=st.passes?"ok":"dim";});
    const ev=document.getElementById("events");ev.textContent="";
    (s.recent||[]).forEach(e=>{const d=document.createElement("div");
      d.textContent=[e.ts,e.skill,e.story,e.duration_ms+"ms",e.success?"ok":"FAIL"].
        filter(Boolean).join(" · ");d.style.color=e.success?"inherit":"#f85149";ev.appendChild(d);});
    document.getElementById("docs").textContent="";
    (s.docs||[]).forEach(f=>{const p=pill(f.path,f.mtime);document.getElementById("docs").appendChild(p);});
    if(!(s.docs||[]).length){const e=document.createElement("span");e.className="dim";e.textContent="no docs/ yet";document.getElementById("docs").appendChild(e);}
    document.getElementById("root").textContent="";
    (s.rootArtifacts||[]).forEach(f=>{document.getElementById("root").appendChild(pill(f.path,f.mtime));});
    if(!(s.rootArtifacts||[]).length){const e=document.createElement("span");e.className="dim";e.textContent="no root artifacts yet";document.getElementById("root").appendChild(e);}
    const g=document.getElementById("git");g.textContent=(s.commits&&s.commits.length?s.commits.join("\\n"):"no commits yet");
  };
const connect=()=>{
  let es;
  try{es=new EventSource("/api/stream");}
  catch(e){es=null;}
  if(es){
    es.onmessage=(e)=>{try{render(JSON.parse(e.data));}catch{}};
    es.onerror=()=>{es.close();setTimeout(connect,5000);};
  }else{
    setInterval(()=>{fetch("/api/status").then(r=>r.json()).then(render).catch(()=>{})},3000);
  }
};
connect();
const ct=(b,id)=>{b.onclick=async()=>{b.disabled=true;try{const r=await fetch("/api/control",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:id})});const j=await r.json();document.getElementById("ctlState").textContent="requested "+id+" @ "+new Date().toLocaleTimeString()+(j.ok?"":" ("+j.error+")");}catch(e){document.getElementById("ctlState").textContent="control request failed";}setTimeout(()=>b.disabled=false,4000);};return b};
ct(document.getElementById("btnStop"),"stop");ct(document.getElementById("btnPause"),"pause");
</script></body></html>`;

const CONTROL_FILE = ".dashboard-control";

function serve(port, tries = 0) {
  const server = http.createServer((req, res) => {
    if (req.url === "/api/status") {
      res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      res.end(JSON.stringify(status()));
    } else if (req.url === "/api/control" && req.method === "POST") {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        let action = null;
        try {
          action = JSON.parse(body || "{}").action;
        } catch {}
        if (action !== "stop" && action !== "pause") {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: false, error: 'action must be "stop" or "pause"' }));
          return;
        }
        try {
          fs.writeFileSync(path.join(projectDir, CONTROL_FILE), JSON.stringify({ action, ts: new Date().toISOString() }));
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, action }));
        } catch (e) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: false, error: String(e.message || e) }));
        }
      });
    } else if (req.url === "/api/stream" && req.method === "GET") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      });
      res.write("retry: 2000\n\n");
      let closed = false;
      const push = () => {
        if (closed) return;
        res.write("data: " + JSON.stringify(status()) + "\n\n");
      };
      push();
      const iv = setInterval(push, 2000);
      req.on("close", () => { closed = true; clearInterval(iv); });
    } else {
      res.writeHead(200, { "Content-Type": "text/html", "Cache-Control": "no-store" });
      res.end(html);
    }
  });
  server.on("error", (e) => {
    if (e.code === "EADDRINUSE" && tries < 50) {
      console.log(`dashboard: port ${port} busy — trying ${port + 1}`);
      serve(port + 1, tries + 1);
    } else {
      console.error(`dashboard: could not bind ${port} (last: ${e.code})`);
      process.exit(1);
    }
});
  server.listen(port, "127.0.0.1", () => {
    console.log(`dashboard: http://127.0.0.1:${port}  (live, read-only — data from ${path.resolve(projectDir)})`);
    // Persist the URL so a resumed run (or a fresh shell) can find it.
    try {
      fs.writeFileSync(path.join(projectDir, ".dashboard-url"),
        JSON.stringify({ url: `http://127.0.0.1:${port}`, port, project: path.resolve(projectDir), started: new Date().toISOString() }));
    } catch {}
  });
}
start();