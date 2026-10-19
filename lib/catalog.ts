import type { StudioComponent } from "./types";

export const CATALOG: StudioComponent[] = [
  {
    slug: "status-pill",
    name: "Status pill",
    screen: "Dashboard",
    tags: ["badge", "status"],
    notes: "110×24 pill. Variants: todo (brand), progress (warning), review (info), draft (muted), paid (success). Use for job and invoice status.",
    html: `<div class="pill todo">To Do</div>
<div class="pill progress">In Progress</div>
<div class="pill review">In Review</div>
<div class="pill draft">Draft</div>
<div class="pill paid">Paid</div>`,
    css: `.pill {
  width: 110px;
  height: 24px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 600;
}
.pill.todo { background: #e6eaff; color: #253db8; }
.pill.progress { background: #fceccf; color: #7a5310; }
.pill.review { background: #cdeffa; color: #1c7694; }
.pill.draft { background: #d8ddeb; color: #1c2230; }
.pill.paid { background: #c9f5df; color: #1b804d; }`,
  },
  {
    slug: "stat-card",
    name: "Statistic card",
    screen: "Dashboard",
    tags: ["card", "kpi"],
    notes: "Header uses status color (To Do is the brand gradient). Metrics sit in 4px-radius bordered boxes. Pending Payments uses a bare metric (no inner border).",
    html: `<article class="stat-card">
  <div class="stat-head todo">To Do</div>
  <div class="stat-metrics">
    <div class="metric"><label>Service jobs</label><strong>4</strong></div>
    <div class="metric"><label>Quotes</label><strong>2</strong></div>
  </div>
</article>`,
    css: `.stat-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(107, 142, 173, 0.07);
  border: 1px solid #e2ecf4;
}
.stat-head { padding: 8px 14px; color: #fff; font-size: 10px; font-weight: 600; }
.stat-head.todo { background: linear-gradient(90deg, #3a63ff, #8a5cff); }
.stat-metrics { display: flex; gap: 12px; padding: 8px 14px; }
.metric {
  flex: 1;
  border: 1px solid #d8ddeb;
  border-radius: 4px;
  padding: 8px 12px;
}
.metric label { display: block; font-size: 9px; }
.metric strong { display: block; font-size: 24px; font-weight: 700; margin-top: 4px; }`,
  },
  {
    slug: "nav-item",
    name: "Sidebar nav item",
    screen: "Shell",
    tags: ["nav", "sidebar"],
    notes: "Inactive: 12px Inter, dark icon. Active: gradient #3a63ff → #8a5cff, white text, inverted icon. Invoice count uses .badge.",
    html: `<a class="nav-item active" href="/dashboard">
  <img src="/figma/icon-dashboard.svg" width="12" height="12" alt="" />
  <span>Dashboard</span>
</a>
<a class="nav-item" href="/invoices">
  <img src="/figma/icon-invoices.svg" width="12" height="12" alt="" />
  <span>Invoices</span>
  <em class="badge">12</em>
</a>`,
    css: `.nav-item {
  display: flex; align-items: center; gap: 10px;
  height: 37px; width: 166px; padding: 0 10px;
  border-radius: 8px; font-size: 12px; color: #1c2230;
}
.nav-item.active {
  background: linear-gradient(90deg, #3a63ff, #8a5cff);
  color: #fff; font-weight: 600;
}
.badge {
  background: #4562f6; color: #fff; font-size: 12px;
  border-radius: 4px; padding: 2px 4px;
}`,
  },
  {
    slug: "topbar",
    name: "Top bar",
    screen: "Shell",
    tags: ["header", "search"],
    notes: "66px tall, title 18px Inter SemiBold. Search 310×36, border #b7c9d8. New Job is the primary gradient button 112×36.",
    html: `<header class="topbar">
  <h1>Today’s Overview</h1>
  <div class="search">
    <img src="/figma/icon-search.svg" width="12" height="12" alt="" />
    Search jobs, customers, vehicles...
  </div>
  <a class="btn-new" href="/job-composer">
    <img src="/figma/icon-plus.svg" width="16" height="16" alt="" />
    New Job
  </a>
</header>`,
    css: `.topbar {
  height: 66px; display: flex; align-items: center; gap: 12px;
  padding: 0 26px; background: rgba(255,255,255,.92);
  box-shadow: 0 8px 12px rgba(0,0,0,.08);
}
.topbar h1 { flex: 1; font-size: 18px; font-weight: 600; margin: 0; }
.search {
  width: 310px; height: 36px; border: 1px solid #b7c9d8;
  border-radius: 8px; display: flex; align-items: center; gap: 8px;
  padding: 0 11px; font-size: 11px; color: #6a748a;
}
.btn-new {
  width: 112px; height: 36px; border: 0; border-radius: 8px;
  background: linear-gradient(90deg, #3a63ff, #8a5cff);
  color: #fff; display: flex; align-items: center; justify-content: center;
  gap: 6px; font-size: 10px; font-weight: 600;
}`,
  },
  {
    slug: "job-row",
    name: "Jobs in Today row",
    screen: "Dashboard",
    tags: ["table", "list"],
    notes: "Job id 165px (10px strong + 9px muted type). Customer flex. Phone 145px. Status pill 110px on the right.",
    html: `<div class="row">
  <div class="job-id">
    <strong>JOB-16012</strong>
    <small>Service &amp; Repair</small>
  </div>
  <div class="cell grow">Pabudu</div>
  <div class="cell phone">0430 458 334</div>
  <div class="pill todo">To Do</div>
</div>`,
    css: `.row {
  display: flex; align-items: center;
  padding: 8px 12px; border-bottom: 0.5px solid #d8ddeb;
}
.job-id { width: 165px; }
.job-id strong { display: block; font-size: 10px; }
.job-id small { display: block; font-size: 9px; color: #6a748a; margin-top: 2px; }
.cell { font-size: 10px; color: #4d566b; font-weight: 500; }
.cell.grow { flex: 1; }
.cell.phone { width: 145px; font-weight: 400; }`,
  },
  {
    slug: "mechanic-row",
    name: "Mechanic row",
    screen: "Dashboard",
    tags: ["list", "avatar"],
    notes: "31px initials avatar. Hours chip is a 999px outline in focus blue (#798ffc) with brand text.",
    html: `<div class="row">
  <div class="mechanic">
    <div class="avatar muted">YG</div>
    <div class="job-id" style="width:auto">
      <strong>Yasas</strong>
      <small>JOB-16009</small>
    </div>
  </div>
  <div class="cell grow">
    Brake pad replacement
    <span class="hours">1.5 h spent</span>
  </div>
  <div class="pill progress">In Progress</div>
</div>`,
    css: `.mechanic { width: 180px; display: flex; align-items: center; gap: 9px; }
.avatar.muted { background: #e9ecf5; color: #1c2230; }
.hours {
  display: inline-flex; border: 1px solid #798ffc; border-radius: 999px;
  padding: 3px 7px; font-size: 9px; font-weight: 700; color: #253db8; margin-top: 3px;
}`,
  },
  {
    slug: "signin-form",
    name: "Sign in form",
    screen: "Sign in 5",
    tags: ["form", "auth"],
    notes: "Poppins. Title is a clipped gradient. Inputs 32px, radius 4px, border #d8ddeb. Primary CTA is full-width gradient. Labels 13px.",
    html: `<form class="signin-form">
  <div>
    <p class="welcome">Hi, Welcome back! 👋</p>
    <h1 class="signin-title">Sign in</h1>
  </div>
  <div class="fields">
    <div class="field">
      <label>Workshop ID</label>
      <input placeholder="Your workshop ID" />
    </div>
    <div class="field">
      <label>User Name</label>
      <input placeholder="Your user name" />
    </div>
    <div class="field">
      <div class="field-row">
        <label>Password</label>
        <a class="forgot" href="#">Forgot password ?</a>
      </div>
      <input type="password" placeholder="Your password" />
    </div>
  </div>
  <button class="btn-signin" type="submit">Sign in</button>
</form>`,
    css: `.signin-form {
  width: 520px; background: #fff; border-radius: 0 12px 12px 0;
  padding: 40px; display: flex; flex-direction: column; gap: 40px;
}
.signin-title {
  font-family: Poppins, sans-serif; font-size: 40px; font-weight: 700;
  background: linear-gradient(90deg, #3a63ff, #8a5cff);
  -webkit-background-clip: text; color: transparent;
}
.field input {
  width: 100%; height: 32px; border: 1px solid #d8ddeb;
  border-radius: 4px; padding: 4px 7px; font-size: 13px;
}
.btn-signin {
  width: 100%; min-height: 32px; border: 0; border-radius: 4px;
  background: linear-gradient(90deg, #3a63ff, #8a5cff);
  color: #fff; font-weight: 700; font-size: 14px;
}`,
  },
  {
    slug: "calendar-chip",
    name: "Calendar job chip",
    screen: "Job Schedule",
    tags: ["calendar"],
    notes: "22px chip inside a day cell. Accent variant uses brand-subtle fill. Today cell uses 2px #798ffc outline.",
    html: `<div class="day today">
  <span class="today-tag">TODAY</span>
  <div class="day-num">22</div>
  <div class="chip"><img src="/figma/dot-todo.svg" width="7" height="7" alt="" /> JOB-16012</div>
  <div class="chip"><img src="/figma/dot-progress.svg" width="7" height="7" alt="" /> QVO-1048</div>
  <div class="more">+4 more</div>
</div>`,
    css: `.day { min-height: 116px; border: 1px solid #eef1f6; padding: 8px; background: #fff; }
.day.today { outline: 2px solid #798ffc; outline-offset: -2px; background: #f4f6ff; }
.chip {
  margin-top: 6px; height: 22px; border-radius: 6px; border: 1px solid #e6eaf2;
  background: #fff; display: flex; align-items: center; gap: 6px; padding: 0 6px; font-size: 9px;
}
.more { margin-top: 6px; font-size: 9px; color: #4562f6; font-weight: 600; }`,
  },
  {
    slug: "job-popover",
    name: "Job details popover",
    screen: "Job Schedule",
    tags: ["overlay"],
    notes: "Dark #1c2230 card, 12px radius, 14px padding. Label/value grid. Divider #3a4254.",
    html: `<aside class="popover">
  <h3>JOB-16009 · Service</h3>
  <dl>
    <dt>Customer</dt><dd>Charith</dd>
    <dt>Phone</dt><dd>0425 164 118</dd>
    <dt>Status</dt><dd>In Progress</dd>
    <dt>Start date</dt><dd>22 Sep 2026</dd>
  </dl>
  <hr />
  <dl>
    <dt>Expected delivery</dt><dd>25 Sep 2026</dd>
  </dl>
</aside>`,
    css: `.popover {
  width: 250px; background: #1c2230; color: #fff;
  border-radius: 12px; padding: 14px;
  box-shadow: 0 16px 40px rgba(0,0,0,.25);
}
.popover h3 { margin: 0 0 10px; font-size: 12px; }
.popover dl { margin: 0; display: grid; grid-template-columns: 90px 1fr; gap: 6px 8px; font-size: 10px; }
.popover dt { color: #96a0b5; }
.popover dd { margin: 0; text-align: right; }
.popover hr { border: 0; border-top: 1px solid #3a4254; margin: 10px 0; }`,
  },
  {
    slug: "form-control",
    name: "Form control",
    screen: "Job Composer",
    tags: ["form", "input"],
    notes: "36px height, 9px radius, 10px Inter placeholder #96a0b5. Pair with .flabel (9px semibold) and .req asterisk in warning brown.",
    html: `<div>
  <div class="flabel">Inspected By <span class="req">*</span></div>
  <div class="control">
    -Select Mechanic-
    <img src="/figma/icon-select.svg" width="12" height="12" alt="" />
  </div>
</div>`,
    css: `.flabel { font-size: 9px; font-weight: 600; color: #4d566b; margin-bottom: 6px; }
.req { color: #7a5310; font-weight: 700; }
.control {
  height: 36px; border: 1px solid #d8ddeb; border-radius: 9px;
  padding: 0 10px; display: flex; align-items: center; justify-content: space-between;
  font-size: 10px; color: #96a0b5; background: #fff; width: 100%;
}`,
  },
  {
    slug: "primary-buttons",
    name: "Composer buttons",
    screen: "Job Composer",
    tags: ["button"],
    notes: "Ghost = white fill, focus-ring border, brand text. Primary = #4562f6 fill, white text. Both 112×36, radius 9px, 10px semibold.",
    html: `<div class="composer-actions">
  <button class="btn-ghost" type="button">Save Draft</button>
  <button class="btn-primary" type="button">Create Job</button>
</div>`,
    css: `.btn-ghost {
  width: 112px; height: 36px; border: 1px solid #798ffc; border-radius: 9px;
  background: #fff; color: #253db8; font-size: 10px; font-weight: 600;
}
.btn-primary {
  width: 112px; height: 36px; border: 1px solid #d8ddeb; border-radius: 9px;
  background: #4562f6; color: #fff; font-size: 10px; font-weight: 600;
}`,
  },
  {
    slug: "job-type-radio",
    name: "Job type radio",
    screen: "Job Composer",
    tags: ["form", "radio"],
    notes: "Selected: brand-subtle fill + primary border + filled radio SVG. Unselected: strong border #8a94a6 and empty 13px circle.",
    html: `<div class="radios">
  <div class="radio on">
    <img src="/figma/icon-radio.svg" width="13" height="13" alt="" />
    Service &amp; Repair
  </div>
  <div class="radio">
    <span class="dot"></span>
    Quotation
  </div>
</div>`,
    css: `.radios { display: flex; gap: 8px; }
.radio {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 10px; border-radius: 9px; border: 1px solid #8a94a6; font-size: 9px;
}
.radio.on { background: #e6eaff; border-color: #4562f6; font-weight: 600; }
.radio .dot {
  width: 13px; height: 13px; border-radius: 999px; border: 1px solid #8a94a6; background: #fff;
}`,
  },
];
