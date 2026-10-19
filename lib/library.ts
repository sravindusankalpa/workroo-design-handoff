import { CATALOG } from "./catalog";
import type { StudioComponent } from "./types";

const FOUNDATIONS: StudioComponent[] = [
  {
    slug: "color-tokens",
    name: "Color tokens",
    screen: "Foundations",
    category: "Foundations",
    tags: ["tokens", "color"],
    notes: "Brand gradient #3a63ff → #8a5cff. Action primary #4562f6. Status fills: todo, progress, review, draft, paid.",
    tokens: ["--color-bg-brand", "--grad-from", "--grad-to", "--color-text-primary", "--color-border-subtle"],
    html: `<div class="token-grid">
  <div class="swatch" style="background:#4562f6"><span>Brand #4562F6</span></div>
  <div class="swatch" style="background:linear-gradient(90deg,#3a63ff,#8a5cff)"><span>Gradient</span></div>
  <div class="swatch dark" style="background:#1c2230"><span>Inverse #1C2230</span></div>
  <div class="swatch" style="background:#e6eaff;color:#253db8"><span>Brand subtle</span></div>
  <div class="swatch" style="background:#fceccf;color:#7a5310"><span>Warning muted</span></div>
  <div class="swatch" style="background:#cdeffa;color:#1c7694"><span>Info muted</span></div>
  <div class="swatch" style="background:#c9f5df;color:#1b804d"><span>Success muted</span></div>
  <div class="swatch" style="background:#d8ddeb;color:#1c2230"><span>Muted surface</span></div>
</div>`,
    css: `.token-grid { display:grid; grid-template-columns:repeat(4,minmax(120px,1fr)); gap:10px; }
.swatch { height:72px; border-radius:10px; padding:10px; display:flex; align-items:flex-end; font-size:11px; font-weight:600; color:#fff; }
.swatch span { text-shadow:0 1px 2px rgba(0,0,0,.25); }`,
  },
  {
    slug: "type-scale",
    name: "Type scale",
    screen: "Foundations",
    category: "Foundations",
    tags: ["tokens", "type"],
    notes: "UI is Inter. Sign-in display is Poppins 40/700. App titles 18 SemiBold. Body 12. Compact tables 9–10.",
    html: `<div class="type-stack">
  <p class="t-display">Sign in</p>
  <p class="t-title">Today’s Overview</p>
  <p class="t-body">Search jobs, customers, vehicles...</p>
  <p class="t-label">INSPECTED BY</p>
  <p class="t-micro">JOB-16012 · Service & Repair</p>
</div>`,
    css: `.type-stack { display:flex; flex-direction:column; gap:12px; }
.t-display { margin:0; font-family:Poppins,sans-serif; font-size:40px; font-weight:700; background:linear-gradient(90deg,#3a63ff,#8a5cff); -webkit-background-clip:text; color:transparent; }
.t-title { margin:0; font-size:18px; font-weight:600; }
.t-body { margin:0; font-size:12px; color:#4d566b; }
.t-label { margin:0; font-size:9px; font-weight:600; letter-spacing:.4px; color:#4d566b; }
.t-micro { margin:0; font-size:10px; color:#6a748a; }`,
  },
  {
    slug: "avatar",
    name: "Mechanic avatar",
    screen: "Dashboard",
    category: "Data display",
    tags: ["avatar", "list"],
    liveRoute: "/dashboard",
    notes: "31×31 circle. Initials 10px semibold. Default muted #e9ecf5. Brand variant uses gradient.",
    variants: [
      { id: "muted", name: "Muted", html: `<div class="avatar muted">YG</div>` },
      { id: "brand", name: "Brand", html: `<div class="avatar brand">PA</div>` },
    ],
    html: `<div style="display:flex;gap:12px;align-items:center">
  <div class="avatar muted">YG</div>
  <div class="avatar brand">PA</div>
</div>`,
    css: `.avatar { width:31px; height:31px; border-radius:999px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:600; }
.avatar.muted { background:#e9ecf5; color:#1c2230; }
.avatar.brand { background:linear-gradient(90deg,#3a63ff,#8a5cff); color:#fff; }`,
  },
  {
    slug: "search-field",
    name: "Search field",
    screen: "Shell",
    category: "Navigation",
    tags: ["search", "input"],
    liveRoute: "/dashboard",
    notes: "310×36, radius 8, border #b7c9d8, placeholder 11px #6a748a.",
    html: `<div class="search">
  <img src="/figma/icon-search.svg" width="12" height="12" alt="" />
  Search jobs, customers, vehicles...
</div>`,
    css: `.search { width:310px; height:36px; border:1px solid #b7c9d8; border-radius:8px; display:flex; align-items:center; gap:8px; padding:0 11px; font-size:11px; color:#6a748a; background:#fff; }`,
  },
  {
    slug: "badge-count",
    name: "Count badge",
    screen: "Shell",
    category: "Buttons & badges",
    tags: ["badge", "nav"],
    liveRoute: "/invoices",
    notes: "Used on Invoices nav. 12px white on #4562f6, radius 4, padding 2×4.",
    html: `<em class="badge">12</em>`,
    css: `.badge { background:#4562f6; color:#fff; font-size:12px; font-style:normal; border-radius:4px; padding:2px 4px; }`,
  },
];

const ENRICH: Record<string, Partial<StudioComponent>> = {
  "status-pill": {
    category: "Buttons & badges",
    liveRoute: "/dashboard",
    tokens: ["--color-bg-brand-subtle", "--color-bg-warning-muted", "--color-bg-info-muted", "--color-bg-success-muted"],
    props: [
      { name: "variant", type: "enum", default: "todo", values: ["todo", "progress", "review", "draft", "paid"] },
      { name: "label", type: "string", default: "To Do" },
    ],
    variants: [
      { id: "todo", name: "To Do", html: `<div class="pill todo">To Do</div>` },
      { id: "progress", name: "In Progress", html: `<div class="pill progress">In Progress</div>` },
      { id: "review", name: "In Review", html: `<div class="pill review">In Review</div>` },
      { id: "draft", name: "Draft", html: `<div class="pill draft">Draft</div>` },
      { id: "paid", name: "Paid", html: `<div class="pill paid">Paid</div>` },
    ],
    angular: `<div class="pill" [ngClass]="job.status">{{ job.statusLabel }}</div>`,
  },
  "stat-card": {
    category: "Data display",
    liveRoute: "/dashboard",
    tokens: ["--shadow-stat", "--grad-from", "--grad-to"],
    props: [
      { name: "title", type: "string", default: "To Do" },
      { name: "tone", type: "enum", default: "todo", values: ["todo", "progress", "review"] },
    ],
    angular: `<article class="stat-card">
  <div class="stat-head" [ngClass]="tone">{{ title }}</div>
  <div class="stat-metrics">
    <div class="metric" *ngFor="let m of metrics"><label>{{ m.label }}</label><strong>{{ m.value }}</strong></div>
  </div>
</article>`,
  },
  "nav-item": {
    category: "Navigation",
    liveRoute: "/dashboard",
    props: [
      { name: "active", type: "boolean", default: "true" },
      { name: "badge", type: "number", default: "12" },
    ],
    variants: [
      { id: "active", name: "Active", html: `<a class="nav-item active" href="/dashboard"><img src="/figma/icon-dashboard.svg" width="12" height="12" alt="" /><span>Dashboard</span></a>` },
      { id: "idle", name: "Idle + badge", html: `<a class="nav-item" href="/invoices"><img src="/figma/icon-invoices.svg" width="12" height="12" alt="" /><span>Invoices</span><em class="badge">12</em></a>` },
    ],
    angular: `<a class="nav-item" [class.active]="item.active" [routerLink]="item.path">
  <img [src]="item.icon" width="12" height="12" alt="" />
  <span>{{ item.label }}</span>
  <em class="badge" *ngIf="item.badge">{{ item.badge }}</em>
</a>`,
  },
  topbar: { category: "Navigation", liveRoute: "/dashboard", tokens: ["--color-border-search", "--grad-from"] },
  "job-row": { category: "Data display", liveRoute: "/dashboard" },
  "mechanic-row": { category: "Data display", liveRoute: "/dashboard" },
  "signin-form": { category: "Forms", liveRoute: "/signin", tokens: ["--grad-from", "--font-display"] },
  "calendar-chip": { category: "Schedule", liveRoute: "/job-schedule" },
  "job-popover": { category: "Schedule", liveRoute: "/job-schedule" },
  "form-control": {
    category: "Forms",
    liveRoute: "/job-composer",
    props: [
      { name: "label", type: "string", default: "Inspected By" },
      { name: "required", type: "boolean", default: "true" },
      { name: "placeholder", type: "string", default: "-Select Mechanic-" },
    ],
    angular: `<label class="flabel">{{ label }} <span class="req" *ngIf="required">*</span></label>
<div class="control">{{ placeholder }}</div>`,
  },
  "primary-buttons": {
    category: "Buttons & badges",
    liveRoute: "/job-composer",
    variants: [
      { id: "ghost", name: "Ghost", html: `<button class="btn-ghost" type="button">Save Draft</button>` },
      { id: "primary", name: "Primary", html: `<button class="btn-primary" type="button">Create Job</button>` },
    ],
    angular: `<button class="btn-ghost" type="button" (click)="saveDraft()">Save Draft</button>
<button class="btn-primary" type="button" (click)="create()">Create Job</button>`,
  },
  "job-type-radio": { category: "Forms", liveRoute: "/job-composer" },
};

const CATEGORY_ORDER = [
  "Foundations",
  "Buttons & badges",
  "Navigation",
  "Data display",
  "Schedule",
  "Forms",
];

export const LIBRARY: StudioComponent[] = [
  ...FOUNDATIONS,
  ...CATALOG.map((item) => ({
    category: "Components",
    liveRoute: undefined,
    ...item,
    ...ENRICH[item.slug],
  })),
].sort((a, b) => {
  const ai = CATEGORY_ORDER.indexOf(a.category || "Components");
  const bi = CATEGORY_ORDER.indexOf(b.category || "Components");
  if (ai !== bi) return ai - bi;
  return a.name.localeCompare(b.name);
});

export const CATEGORIES = CATEGORY_ORDER;

export const CATEGORY_COPY: Record<string, string> = {
  Foundations: "Color and type tokens used across Workroo admin screens.",
  "Buttons & badges": "Status pills, count badges, and composer actions.",
  Navigation: "Sidebar items, search, and the application top bar.",
  "Data display": "KPI cards, job rows, mechanics, and avatars.",
  Schedule: "Calendar chips and the job details popover.",
  Forms: "Composer controls, radios, and the sign-in form.",
};

export function libraryComponent(slug: string) {
  return LIBRARY.find((item) => item.slug === slug) ?? null;
}
