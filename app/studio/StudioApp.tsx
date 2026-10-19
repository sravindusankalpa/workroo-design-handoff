"use client";

import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, CATEGORY_COPY } from "@/lib/library";
import type { StudioComponent, StudioQuestion } from "@/lib/types";
import { classList, previewDoc, toReact } from "./previewDoc";
import "./studio.css";

type Payload = { mongo: boolean; uriHint: string; components: StudioComponent[] };
type Mode = "library" | "inspect";
type Addon = "controls" | "code" | "actions" | "discuss";
type Theme = "light" | "dark" | "grid";
type CodeTab = "html" | "css" | "react" | "angular" | "snippet";

const FAV_KEY = "workroo-lib-favs";

function snippet(component: StudioComponent, html: string) {
  return `<!-- ${component.name} -->
<style>
${component.css}
</style>
${html}
`;
}

function downloadFile(name: string, text: string, type: string) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadHtml(component: StudioComponent, html: string) {
  downloadFile(`${component.slug}.html`, previewDoc(html, component.css), "text/html");
}

async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}

export function StudioApp() {
  const [data, setData] = useState<Payload | null>(null);
  const [query, setQuery] = useState("");
  const [slug, setSlug] = useState("status-pill");
  const [mode, setMode] = useState<Mode>("library");
  const [addon, setAddon] = useState<Addon>("code");
  const [codeTab, setCodeTab] = useState<CodeTab>("html");
  const [theme, setTheme] = useState<Theme>("light");
  const [width, setWidth] = useState<"fluid" | "375" | "768" | "1440">("fluid");
  const [zoom, setZoom] = useState(100);
  const [inspect, setInspect] = useState(false);
  const [compare, setCompare] = useState(false);
  const [wide, setWide] = useState(false);
  const [help, setHelp] = useState(false);
  const [hit, setHit] = useState("");
  const [measure, setMeasure] = useState("");
  const [variant, setVariant] = useState("all");
  const [copied, setCopied] = useState("");
  const [category, setCategory] = useState("All");
  const [favs, setFavs] = useState<string[]>([]);
  const [questions, setQuestions] = useState<StudioQuestion[]>([]);
  const [author, setAuthor] = useState("dev");
  const [question, setQuestion] = useState("");
  const [replyId, setReplyId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const inspectRef = useRef(inspect);
  inspectRef.current = inspect;

  useEffect(() => {
    fetch("/api/studio/components")
      .then((r) => r.json())
      .then((payload: Payload) => {
        setData(payload);
        const hash = window.location.hash.replace("#", "");
        const match = payload.components.find((c) => c.slug === hash);
        if (match) {
          setSlug(match.slug);
          setMode("inspect");
        }
      });
    try {
      setFavs(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
    } catch {
      setFavs([]);
    }
  }, []);

  const selected = useMemo(
    () => data?.components.find((c) => c.slug === slug) ?? data?.components[0],
    [data, slug],
  );

  const grouped = useMemo(() => {
    const q = query.toLowerCase();
    const map = new Map<string, StudioComponent[]>();
    for (const item of CATEGORIES) map.set(item, []);
    for (const item of data?.components ?? []) {
      const textOk =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.screen.toLowerCase().includes(q) ||
        item.tags.join(" ").includes(q);
      if (!textOk) continue;
      const key = item.category || "Components";
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(item);
    }
    return map;
  }, [data, query]);

  useEffect(() => {
    if (!selected) return;
    if (mode === "inspect") history.replaceState(null, "", `#${selected.slug}`);
    else history.replaceState(null, "", "/");
  }, [selected?.slug, mode]);

  useEffect(() => {
    if (!selected) return;
    fetch(`/api/studio/questions?slug=${selected.slug}`)
      .then((r) => r.json())
      .then((payload: { questions: StudioQuestion[] }) => setQuestions(payload.questions));
    setVariant("all");
    setHit("");
    setMeasure("");
    setCompare(false);
  }, [selected?.slug]);

  const html = useMemo(() => {
    if (!selected) return "";
    if (variant !== "all") {
      return selected.variants?.find((item) => item.id === variant)?.html || selected.html;
    }
    return selected.html;
  }, [selected, variant]);

  const src = useMemo(
    () => (selected ? previewDoc(html, selected.css, theme) : ""),
    [selected, html, theme],
  );

  const code = useMemo(() => {
    if (!selected) return "";
    if (codeTab === "css") return selected.css;
    if (codeTab === "angular") return selected.angular || "No Angular snippet yet — copy HTML and map class names.";
    if (codeTab === "react") return toReact(selected.name, html);
    if (codeTab === "snippet") return snippet(selected, html);
    return html;
  }, [selected, codeTab, html]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const onLoad = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      iframe.style.height = `${Math.max(280, doc.documentElement.scrollHeight)}px`;
      const onClick = (event: Event) => {
        if (!inspectRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as HTMLElement;
        doc.querySelectorAll(".hit").forEach((node) => node.classList.remove("hit"));
        target.classList.add("hit");
        if (!doc.getElementById("hit-style")) {
          const style = doc.createElement("style");
          style.id = "hit-style";
          style.textContent = ".hit{outline:2px solid #4562f6;outline-offset:2px;}";
          doc.head.appendChild(style);
        }
        const box = target.getBoundingClientRect();
        const cls = typeof target.className === "string" ? target.className.replace("hit", "").trim() : "";
        setHit(cls || target.tagName.toLowerCase());
        setMeasure(`${Math.round(box.width)} × ${Math.round(box.height)}px`);
        setAddon("code");
        setCodeTab("css");
      };
      doc.addEventListener("click", onClick, true);
    };
    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, [src]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const typing = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setHelp(false);
        setMode("library");
      }
      if (event.key === "?" && !typing) setHelp((v) => !v);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "c" && event.shiftKey && selected) {
        event.preventDefault();
        flashCopy("html", html);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, html]);

  function openComponent(next: string) {
    setSlug(next);
    setMode("inspect");
    setAddon("code");
  }

  async function flashCopy(label: string, text: string) {
    await copyText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1200);
  }

  function toggleFav(id: string, event: MouseEvent) {
    event.stopPropagation();
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
      return next;
    });
  }

  async function ask(event: FormEvent) {
    event.preventDefault();
    if (!selected || !question.trim()) return;
    const created = await fetch("/api/studio/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: selected.slug, author, question }),
    }).then((r) => r.json());
    setQuestions((prev) => [created, ...prev]);
    setQuestion("");
  }

  async function sendReply(id: string) {
    if (!reply.trim()) return;
    const updated = await fetch(`/api/studio/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: reply, answeredBy: author }),
    }).then((r) => r.json());
    setQuestions((prev) => prev.map((item) => (item.id === id ? updated : item)));
    setReplyId(null);
    setReply("");
  }

  if (!data || !selected) {
    return <div className="studio">Loading library…</div>;
  }

  const jsonSpec = JSON.stringify(
    {
      slug: selected.slug,
      name: selected.name,
      category: selected.category,
      screen: selected.screen,
      tags: selected.tags,
      tokens: selected.tokens,
      props: selected.props,
      notes: selected.notes,
      html,
      css: selected.css,
    },
    null,
    2,
  );

  const librarySections = CATEGORIES.map((group) => ({
    group,
    items: (data.components ?? []).filter((c) => {
      if ((c.category || "Components") !== group) return false;
      if (category === "Starred") return favs.includes(c.slug);
      if (category !== "All" && category !== group) return false;
      const q = query.toLowerCase();
      return (
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.screen.toLowerCase().includes(q) ||
        c.tags.join(" ").includes(q)
      );
    }),
  })).filter((section) => section.items.length);

  return (
    <div className="studio">
      <header className="lib-top">
        <button
          className="brand-mark"
          type="button"
          onClick={() => {
            setCategory("All");
            setMode("library");
          }}
        >
          <em>W</em>
          Workroo UI
        </button>
        <nav>
          <span className={`mongo-pill ${data.mongo ? "ok" : "off"}`}>
            {data.mongo ? "Mongo connected" : "Local store"}
          </span>
          <a href="/signin">Sign in</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/job-schedule">Schedule</a>
          <a href="/job-composer">Composer</a>
          <button className="ghost" type="button" onClick={() => setHelp((v) => !v)}>
            Shortcuts
          </button>
        </nav>
      </header>

      <aside className="studio-side">
        <input
          ref={searchRef}
          className="studio-search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="studio-list">
          {CATEGORIES.map((group) => {
            const items = grouped.get(group) ?? [];
            if (!items.length) return null;
            return (
              <div key={group}>
                <button
                  className="cat-label"
                  type="button"
                  onClick={() => {
                    setCategory(group);
                    setMode("library");
                  }}
                >
                  {group}
                </button>
                {items.map((c) => (
                  <div
                    key={`${group}-${c.slug}`}
                    className={`studio-item${c.slug === selected.slug && mode === "inspect" ? " on" : ""}`}
                  >
                    <button type="button" onClick={() => openComponent(c.slug)}>
                      <strong>{c.name}</strong>
                    </button>
                    <button
                      className={`star${favs.includes(c.slug) ? " on" : ""}`}
                      type="button"
                      aria-label="Star component"
                      onClick={(event) => toggleFav(c.slug, event)}
                    >
                      ★
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </aside>

      <section className="studio-main">
        {mode === "library" ? (
          <>
            <div className="hero">
              <h1>Workroo UI components</h1>
              <p>
                Copy HTML and CSS for Workroo admin screens — status pills, navigation, schedule, composer, and
                sign-in. Built from the Figma playground for the engineering team.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" type="button" onClick={() => openComponent("status-pill")}>
                  Explore components
                </button>
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={() =>
                    downloadFile(
                      "workroo-ui.css",
                      data.components.map((c) => `/* ${c.name} */\n${c.css}`).join("\n\n"),
                      "text/css",
                    )
                  }
                >
                  Export all CSS
                </button>
              </div>
            </div>
            {librarySections.map((section) => (
              <section className="uu-section" key={section.group} id={`sec-${section.group}`}>
                <h2>{section.group}</h2>
                <p>{CATEGORY_COPY[section.group]}</p>
                <div className="gallery">
                  {section.items.map((c) => (
                    <article key={c.slug} className="gallery-card">
                      <div className="mini">
                        <iframe
                          className="mini-frame"
                          title={`${c.name} preview`}
                          sandbox="allow-same-origin"
                          srcDoc={previewDoc(c.html, c.css)}
                        />
                        <button className="mini-hit" type="button" onClick={() => openComponent(c.slug)}>
                          Open {c.name}
                        </button>
                      </div>
                      <footer>
                        <strong>{c.name}</strong>
                        <span>
                          1 component{c.variants?.length ? ` + ${c.variants.length} variants` : ""}
                        </span>
                      </footer>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </>
        ) : (
          <div className="doc-page">
            <div className="crumb">
              <button type="button" onClick={() => setMode("library")}>
                Components
              </button>
              {" / "}
              {selected.category} / {selected.name}
              {measure ? ` · ${hit} ${measure}` : ""}
            </div>
            <h1>{selected.name}</h1>
            <p className="doc-lead">{selected.notes}</p>
            <div className="toolbar">
              {(["light", "dark", "grid"] as Theme[]).map((item) => (
                <button
                  key={item}
                  className={`tool-btn${theme === item ? " on" : ""}`}
                  type="button"
                  onClick={() => setTheme(item)}
                >
                  {item}
                </button>
              ))}
              {(["fluid", "375", "768", "1440"] as const).map((item) => (
                <button
                  key={item}
                  className={`tool-btn${width === item ? " on" : ""}`}
                  type="button"
                  onClick={() => setWidth(item)}
                >
                  {item === "fluid" ? "Fluid" : `${item}w`}
                </button>
              ))}
              <button className="tool-btn" type="button" onClick={() => setZoom((z) => Math.max(50, z - 25))}>
                −
              </button>
              <span className="crumb" style={{ margin: 0 }}>
                {zoom}%
              </span>
              <button className="tool-btn" type="button" onClick={() => setZoom((z) => Math.min(150, z + 25))}>
                +
              </button>
              <button className={`tool-btn${inspect ? " on" : ""}`} type="button" onClick={() => setInspect((v) => !v)}>
                Measure
              </button>
              <button className={`tool-btn${compare ? " on" : ""}`} type="button" onClick={() => setCompare((v) => !v)}>
                Compare
              </button>
              {selected.liveRoute ? (
                <a className="tool-btn" href={selected.liveRoute}>
                  Open live
                </a>
              ) : null}
            </div>
            <div className={`preview-canvas theme-${theme}`}>
              {compare && selected.variants?.length ? (
                <div className="compare">
                  {selected.variants.map((item) => (
                    <div key={item.id} className="compare-cell">
                      <span>{item.name}</span>
                      <iframe title={item.name} sandbox="allow-same-origin" srcDoc={previewDoc(item.html, selected.css, theme)} />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="preview-frame"
                  style={{
                    width: width === "fluid" ? "100%" : `${width}px`,
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top center",
                  }}
                >
                  <iframe ref={iframeRef} className="inspect-frame" title={selected.name} sandbox="allow-same-origin" srcDoc={src} />
                  {inspect ? (
                    <p className="inspect-hint">Click a node to measure it. {hit ? `${hit} · ${measure}` : ""}</p>
                  ) : null}
                </div>
              )}
            </div>

            <div className="tabs">
              {(["controls", "code", "actions", "discuss"] as Addon[]).map((item) => (
                <button key={item} className={addon === item ? "on" : ""} type="button" onClick={() => setAddon(item)}>
                  {item === "discuss" ? "Q&A" : item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
            <div className="addon-body">
              {addon === "controls" ? (
                <>
                  {selected.variants?.length ? (
                    <div className="variant-row">
                      <button className={`chip-btn${variant === "all" ? " on" : ""}`} type="button" onClick={() => setVariant("all")}>
                        All
                      </button>
                      {selected.variants.map((item) => (
                        <button
                          key={item.id}
                          className={`chip-btn${variant === item.id ? " on" : ""}`}
                          type="button"
                          onClick={() => setVariant(item.id)}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {(selected.props ?? []).map((prop) => (
                    <div className="prop-row" key={prop.name}>
                      <b>{prop.name}</b>
                      <span>
                        {prop.type} · {prop.default}
                        {prop.values ? ` (${prop.values.join(", ")})` : ""}
                      </span>
                    </div>
                  ))}
                  {(selected.tokens ?? []).map((token) => (
                    <div className="token" key={token}>
                      <b>{token}</b>
                      <button className="chip-btn" type="button" onClick={() => flashCopy("token", token)}>
                        {copied === "token" ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </>
              ) : null}

              {addon === "code" ? (
                <>
                  <div className="variant-row">
                    {(["html", "css", "react", "angular", "snippet"] as CodeTab[]).map((item) => (
                      <button
                        key={item}
                        className={`chip-btn${codeTab === item ? " on" : ""}`}
                        type="button"
                        onClick={() => setCodeTab(item)}
                      >
                        {item === "snippet" ? "HTML+CSS" : item.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <div className="code-pane">
                    <button className="copy-btn" type="button" onClick={() => flashCopy("code", code)}>
                      {copied === "code" ? "Copied" : "Copy"}
                    </button>
                    <pre>{code}</pre>
                  </div>
                </>
              ) : null}

              {addon === "actions" ? (
                <div className="action-grid">
                  <button className="action-btn primary" type="button" onClick={() => flashCopy("html", html)}>
                    {copied === "html" ? "Copied HTML" : "Copy HTML"}
                  </button>
                  <button className="action-btn" type="button" onClick={() => flashCopy("css", selected.css)}>
                    {copied === "css" ? "Copied CSS" : "Copy CSS"}
                  </button>
                  <button className="action-btn" type="button" onClick={() => flashCopy("all", snippet(selected, html))}>
                    {copied === "all" ? "Copied snippet" : "Copy HTML + CSS"}
                  </button>
                  <button className="action-btn" type="button" onClick={() => flashCopy("react", toReact(selected.name, html))}>
                    {copied === "react" ? "Copied React" : "Copy React"}
                  </button>
                  <button className="action-btn" type="button" onClick={() => flashCopy("ng", selected.angular || html)}>
                    {copied === "ng" ? "Copied Angular" : "Copy Angular"}
                  </button>
                  <button className="action-btn" type="button" onClick={() => flashCopy("class", classList(html))}>
                    {copied === "class" ? "Copied classes" : "Copy classes"}
                  </button>
                  <button className="action-btn" type="button" onClick={() => flashCopy("json", jsonSpec)}>
                    {copied === "json" ? "Copied JSON" : "Copy JSON spec"}
                  </button>
                  <button className="action-btn" type="button" onClick={() => downloadHtml(selected, html)}>
                    Download .html
                  </button>
                  <button className="action-btn" type="button" onClick={() => downloadFile(`${selected.slug}.css`, selected.css, "text/css")}>
                    Download .css
                  </button>
                  <button className="action-btn" type="button" onClick={() => flashCopy("link", `${window.location.origin}/#${selected.slug}`)}>
                    {copied === "link" ? "Copied link" : "Copy permalink"}
                  </button>
                  {selected.liveRoute ? (
                    <a className="action-btn" href={selected.liveRoute}>
                      Open live screen
                    </a>
                  ) : null}
                </div>
              ) : null}

              {addon === "discuss" ? (
                <>
                  {questions.map((q) => (
                    <div className="q" key={q.id}>
                      <b>
                        {q.author}: {q.question}
                      </b>
                      {q.answer ? (
                        <div className="ans">
                          {q.answeredBy}: {q.answer}
                        </div>
                      ) : replyId === q.id ? (
                        <div className="ask">
                          <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a reply" />
                          <button type="button" onClick={() => sendReply(q.id)}>
                            Save reply
                          </button>
                        </div>
                      ) : (
                        <button className="chip-btn" type="button" onClick={() => setReplyId(q.id)}>
                          Reply
                        </button>
                      )}
                    </div>
                  ))}
                  <form className="ask" onSubmit={ask}>
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder={`Ask about ${selected.name}`}
                    />
                    <button type="submit">Ask the team</button>
                  </form>
                </>
              ) : null}
            </div>
          </div>
        )}
      </section>

      {help ? (
        <div className="help">
          <strong>Shortcuts</strong>
          <p>/ search · Esc back to components · ? this panel</p>
          <p>Shift+Ctrl/Cmd+C copy HTML</p>
          <button type="button" className="tool-btn" onClick={() => setHelp(false)}>
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
}
