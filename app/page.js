import Header from "./components/Header";
import HeroLoginButton from "./components/HeroLoginButton";

// ── Placeholder content (static — no fetching) ─────────────────────────
const projects = [
  {
    name: "neon-orm",
    blurb: "Type-safe ORM that compiles straight to the metal.",
    tags: ["rust", "db"],
    stars: 2841,
    forks: 193,
  },
  {
    name: "ghostkit",
    blurb: "Zero-config component library for dark-mode UIs.",
    tags: ["react", "ui"],
    stars: 5120,
    forks: 412,
  },
  {
    name: "synapse-cli",
    blurb: "AI pair-programmer that lives in your terminal.",
    tags: ["ai", "cli"],
    stars: 8930,
    forks: 766,
  },
  {
    name: "voidpack",
    blurb: "Bundler built on the void — instant cold starts.",
    tags: ["tooling", "wasm"],
    stars: 1502,
    forks: 88,
  },
  {
    name: "chrome-veins",
    blurb: "Animated SVG engine for cyberpunk dashboards.",
    tags: ["svg", "anim"],
    stars: 977,
    forks: 54,
  },
  {
    name: "deadlock",
    blurb: "Distributed lock manager with zero deadlocks. Really.",
    tags: ["go", "infra"],
    stars: 3344,
    forks: 220,
  },
];

const snippets = [
  {
    title: "debounce.js",
    code: `const debounce = (fn, ms) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};`,
  },
  {
    title: "neon.css",
    code: `.glow {
  color: #ffffff;
  text-shadow: none;
}`,
  },
  {
    title: "pipe.py",
    code: `from functools import reduce

def pipe(*fns):
    return lambda x: reduce(
        lambda acc, f: f(acc), fns, x
    )`,
  },
];

const members = [
  { handle: "n3on_rider", role: "core" },
  { handle: "byte_witch", role: "maintainer" },
  { handle: "0xGH0ST", role: "contributor" },
  { handle: "mainframe_mei", role: "core" },
  { handle: "void.runner", role: "contributor" },
  { handle: "synth_kid", role: "maintainer" },
];

function TagChip({ children, boldWhite = false }) {
  if (boldWhite) {
    return (
      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground border border-white/20 bg-white/5 px-2 py-0.5 rounded-sm">
        {children}
      </span>
    );
  }
  return <span className="mac-tag">{children}</span>;
}

function MacWindow({ title, code }) {
  return (
    <div className="mac-window">
      <div className="mac-titlebar">
        <span className="mac-dot mac-dot-red" aria-hidden="true" />
        <span className="mac-dot mac-dot-yellow" aria-hidden="true" />
        <span className="mac-dot mac-dot-green" aria-hidden="true" />
        <span className="ml-2 text-xs text-muted truncate">{title}</span>
      </div>
      <pre className="mac-code">
        <code>{code}</code>
      </pre>
    </div>
  );
}



export default function Home() {
  return (
    <div className="flex flex-col flex-1 text-foreground">
      <Header />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="scanlines auth-ambient px-6 sm:px-10 py-20 sm:py-28 text-center border-b border-primary/15 relative">
        <p className="text-comment text-xs uppercase tracking-[0.4em] mb-4">
          {"// dev grid online"}
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
          Build in the dark.
          <br />
          Ship at the speed of light.
        </h1>
        <p className="mt-6 text-muted max-w-xl mx-auto">
          DevForge is the underground community for builders, breakers, and
          dreamers. Browse projects, trade snippets, and jack in.
        </p>
        <HeroLoginButton />
      </section>

      {/* ── Projects ────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-16">
        <h2 className="text-foreground font-black uppercase tracking-[0.3em] text-base mb-8">
          ## trending_repos
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.name} className="mac-card p-5 transition-colors">
              <h3 className="text-foreground font-bold">
                {p.name}
              </h3>
              <p className="text-primary/90 text-sm mt-2 min-h-[2.5rem]">
                {p.blurb}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((t) => (
                  <TagChip key={t} boldWhite>
                    {t}
                  </TagChip>
                ))}
              </div>
              <div className="flex gap-5 mt-4 text-xs font-bold text-foreground">
                <span>★ {p.stars.toLocaleString()}</span>
                <span>⑂ {p.forks}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Snippets ────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-16 border-t border-white/10">
        <h2 className="text-foreground font-black uppercase tracking-[0.3em] text-base mb-8">
          ## snippet_vault
        </h2>
        <div className="grid gap-5 lg:grid-cols-3 items-stretch">
          {snippets.map((s) => (
            <MacWindow key={s.title} title={s.title} code={s.code} />
          ))}
        </div>
      </section>

      {/* ── Online members ──────────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-16 border-t border-white/10">
        <h2 className="text-foreground font-black uppercase tracking-[0.3em] text-base mb-8">
          ## online_now
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <li
              key={m.handle}
              className="mac-card flex items-center gap-3 px-4 py-3 transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="text-foreground">@{m.handle}</span>
              <span className="ml-auto text-[10px] uppercase tracking-widest text-muted">
                {m.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="mt-auto px-6 sm:px-10 py-8 border-t border-white/10 text-center text-xs text-muted">
        <span className="text-primary neon-text tracking-[0.3em]">DEVFORGE</span>{" "}
        <span className="text-comment">{"// © 2099 — all signals encrypted."}</span>
      </footer>
    </div>
  );
}
