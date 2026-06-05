import Link from "next/link";
import {
  FolderKanban,
  Zap,
  CheckSquare,
  LayoutDashboard,
  ArrowRight,
  Layers,
  Timer,
  Code2,
  SlidersHorizontal,
  ChevronRight,
  Circle,
  Calendar,
} from "lucide-react";

// ─── Shared tiny components ───────────────────────────────────────────────────

function StatusPill({
  color,
  label,
}: {
  color: "emerald" | "blue" | "neutral" | "amber";
  label: string;
}) {
  const map = {
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border border-blue-100",
    neutral: "bg-neutral-100 text-neutral-500 border border-neutral-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-100",
  };
  const dot = {
    emerald: "bg-emerald-400",
    blue: "bg-blue-400",
    neutral: "bg-neutral-300",
    amber: "bg-amber-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${map[color]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot[color]}`} />
      {label}
    </span>
  );
}

// ─── App-style UI mock components ─────────────────────────────────────────────

function DashboardMock() {
  return (
    <div className="bg-neutral-50 rounded-xl border border-neutral-200 shadow-sm overflow-hidden text-left select-none">
      {/* mock top bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-white border-b border-neutral-100">
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
        <span className="ml-3 text-[11px] text-neutral-400 font-medium">
          localhost:3000/dashboard
        </span>
      </div>
      <div className="flex h-[340px]">
        {/* sidebar */}
        <div className="w-36 bg-white border-r border-neutral-100 flex flex-col py-4 px-3 shrink-0">
          <div className="flex items-center gap-1.5 mb-5">
            <div className="w-5 h-5 rounded bg-neutral-900 flex items-center justify-center">
              <Zap size={10} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-neutral-900">
              DevBoard
            </span>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 px-2 mb-1.5">
            Menu
          </p>
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: FolderKanban, label: "Projects" },
            { icon: CheckSquare, label: "Todos" },
          ].map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md mb-0.5 ${
                active ? "bg-neutral-100 text-neutral-900" : "text-neutral-500"
              }`}
            >
              <Icon size={11} strokeWidth={active ? 2.2 : 1.8} />
              <span className="text-[11px] font-medium">{label}</span>
              {active && (
                <ChevronRight size={10} className="ml-auto text-neutral-400" />
              )}
            </div>
          ))}
        </div>
        {/* content */}
        <div className="flex-1 overflow-hidden px-5 py-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5">
            Overview
          </p>
          <p className="text-sm font-semibold text-neutral-900 mb-3">
            Welcome back, Chirag
          </p>
          {/* stat tiles */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {[
              { label: "Total Projects", val: "3" },
              { label: "Active Projects", val: "2", accent: true },
              { label: "Total Tasks", val: "2" },
              { label: "Completed", val: "0" },
              { label: "Todos", val: "3" },
            ].map(({ label, val, accent }) => (
              <div
                key={label}
                className="bg-white rounded-lg border border-neutral-100 p-2"
              >
                <p className="text-[8px] text-neutral-400 mb-0.5">{label}</p>
                <p
                  className={`text-base font-semibold ${accent ? "text-emerald-600" : "text-neutral-900"}`}
                >
                  {val}
                </p>
              </div>
            ))}
          </div>
          {/* two-col */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-lg border border-neutral-100 p-3">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">
                Recent Projects
              </p>
              {[
                { name: "OIDC/OAuth System", status: "ACTIVE" as const },
                { name: "Todo Applicaton", status: "ACTIVE" as const },
                { name: "DEV TOOLS", status: "PLANNING" as const },
              ].map(({ name, status }) => (
                <div
                  key={name}
                  className="flex items-center justify-between py-1 border-b border-neutral-50 last:border-0"
                >
                  <span className="text-[10px] text-neutral-700 truncate max-w-[80px]">
                    {name}
                  </span>
                  <span
                    className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${
                      status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg border border-neutral-100 p-3">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">
                Recent Todos
              </p>
              {[
                { name: "Brush your teeth", status: "TODO" },
                { name: "Grind Hard", status: "IN_PROGRESS" },
                { name: "Complete Your Work", status: "IN_PROGRESS" },
              ].map(({ name, status }) => (
                <div
                  key={name}
                  className="flex items-center justify-between py-1 border-b border-neutral-50 last:border-0"
                >
                  <span className="text-[10px] text-neutral-700 truncate max-w-[80px]">
                    {name}
                  </span>
                  <span className="text-[8px] text-neutral-400">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsMock() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden select-none">
      <div className="px-5 py-4 border-b border-neutral-100">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-0.5">
          Workspace
        </p>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">
              Projects
            </h3>
            <p className="text-xs text-neutral-400">
              3 projects in your workspace
            </p>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-medium">
            <span className="text-sm leading-none">+</span> New Project
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        {[
          {
            name: "OIDC/OAuth System",
            status: "ACTIVE" as const,
            tasks: 0,
            date: "Jun 4, 2026",
          },
          {
            name: "Todo Applicaton",
            status: "ACTIVE" as const,
            tasks: 1,
            date: "Jun 2, 2026",
          },
          {
            name: "DEV TOOLS",
            status: "PLANNING" as const,
            tasks: 1,
            date: "May 30, 2026",
          },
        ].map(({ name, status, tasks, date }) => (
          <div
            key={name}
            className="bg-neutral-50 rounded-lg border border-neutral-100 p-3"
          >
            <StatusPill
              color={status === "ACTIVE" ? "emerald" : "neutral"}
              label={status}
            />
            <p className="text-xs font-semibold text-neutral-800 mt-2 mb-2 leading-snug">
              {name}
            </p>
            <div className="flex items-center justify-between text-[10px] text-neutral-400">
              <span className="flex items-center gap-1">
                <CheckSquare size={9} /> {tasks} tasks
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={9} /> {date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TodosMock() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden select-none">
      <div className="px-5 py-4 flex items-center justify-between border-b border-neutral-100">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-0.5">
            Personal
          </p>
          <h3 className="text-base font-semibold text-neutral-900">Todos</h3>
          <p className="text-xs text-neutral-400">2 pending · 0 done</p>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-medium">
          <span className="text-sm leading-none">+</span> New Todo
        </div>
      </div>
      <div className="divide-y divide-neutral-100">
        <div className="grid grid-cols-[1fr_180px] px-5 py-2 bg-neutral-50">
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
            Task
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
            Status
          </span>
        </div>
        {[
          { name: "Grind Hard", status: "IN_PROGRESS" as const },
          { name: "Complete Your Work", status: "IN_PROGRESS" as const },
        ].map(({ name, status }) => (
          <div
            key={name}
            className="grid grid-cols-[1fr_180px] items-center px-5 py-3"
          >
            <span className="text-sm font-medium text-neutral-800">{name}</span>
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 w-fit">
              In Progress
            </span>
          </div>
        ))}
        <div className="px-5 py-2.5 bg-neutral-50">
          <span className="text-xs text-neutral-400">2 todos total</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main landing page ─────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-neutral-900 flex items-center justify-center">
              <Zap size={13} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-neutral-900">
              DevBoard
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-neutral-500">
            <a
              href="#features"
              className="hover:text-neutral-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#preview"
              className="hover:text-neutral-900 transition-colors"
            >
              Preview
            </a>
            <a href="#why" className="hover:text-neutral-900 transition-colors">
              Why DevBoard
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors hidden sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-600 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Now in public beta
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.1] mb-5">
              Manage Projects,
              <br />
              Tasks &amp; Todos
              <br />
              <span className="text-neutral-400">Without the Chaos</span>
            </h1>
            <p className="text-base text-neutral-500 leading-relaxed mb-8 max-w-md">
              DevBoard helps developers and teams organize projects, track
              progress, and stay productive from a single workspace.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 active:scale-[0.98] transition-all"
              >
                Get Started
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Right — dashboard preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-2xl -z-10" />
            <div className="p-4">
              <DashboardMock />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        className="bg-neutral-50 border-y border-neutral-100 py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
              Features
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
              Everything you need, nothing you don't
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: FolderKanban,
                title: "Projects",
                desc: "Organize your work into focused projects. Track status from planning to completion and keep everything together.",
                pill: { color: "emerald" as const, label: "Active" },
              },
              {
                icon: Zap,
                title: "Tasks",
                desc: "Break projects into actionable tasks. Set priorities, update statuses, and never lose track of what needs doing.",
                pill: { color: "blue" as const, label: "In Progress" },
              },
              {
                icon: CheckSquare,
                title: "Todos",
                desc: "Keep personal work separate from project work. A clean space for everything that doesn't belong to a project.",
                pill: { color: "neutral" as const, label: "Todo" },
              },
            ].map(({ icon: Icon, title, desc, pill }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-neutral-100 p-6 hover:border-neutral-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
                    <Icon
                      size={16}
                      className="text-neutral-700"
                      strokeWidth={1.8}
                    />
                  </div>
                  <StatusPill color={pill.color} label={pill.label} />
                </div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Preview ── */}
      <section id="preview" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
              Product Preview
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 mb-3">
              A workspace that gets out of your way
            </h2>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              Clean, fast, and focused. DevBoard looks like the tools you
              already love.
            </p>
          </div>

          <div className="space-y-6">
            {/* Dashboard — full width */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded bg-neutral-100 flex items-center justify-center">
                  <LayoutDashboard size={11} className="text-neutral-600" />
                </div>
                <span className="text-xs font-semibold text-neutral-700">
                  Dashboard
                </span>
                <span className="text-xs text-neutral-400">
                  — your command center
                </span>
              </div>
              <DashboardMock />
            </div>

            {/* Projects + Todos side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded bg-neutral-100 flex items-center justify-center">
                    <FolderKanban size={11} className="text-neutral-600" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-700">
                    Projects
                  </span>
                  <span className="text-xs text-neutral-400">
                    — organized by workspace
                  </span>
                </div>
                <ProjectsMock />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded bg-neutral-100 flex items-center justify-center">
                    <CheckSquare size={11} className="text-neutral-600" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-700">
                    Todos
                  </span>
                  <span className="text-xs text-neutral-400">
                    — personal task tracking
                  </span>
                </div>
                <TodosMock />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why DevBoard ── */}
      <section
        id="why"
        className="bg-neutral-50 border-y border-neutral-100 py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
              Why DevBoard
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
              Built for how developers actually work
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: SlidersHorizontal,
                title: "Simple",
                desc: "No unnecessary complexity. Every feature earns its place. Get productive in minutes, not hours.",
              },
              {
                icon: Timer,
                title: "Fast",
                desc: "Built on Next.js App Router with server components. Pages load instantly. Actions resolve immediately.",
              },
              {
                icon: Layers,
                title: "Organized",
                desc: "Projects, tasks, and todos in one place. Clear hierarchy. No confusion about where anything lives.",
              },
              {
                icon: Code2,
                title: "Built for Developers",
                desc: "TypeScript, Prisma, PostgreSQL under the hood. Clean architecture you can understand and extend.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-neutral-100 p-5 hover:border-neutral-200 hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mb-3">
                  <Icon
                    size={14}
                    className="text-neutral-700"
                    strokeWidth={1.8}
                  />
                </div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-10">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center mx-auto mb-5">
              <Zap size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 mb-3">
              Ready to get organized?
            </h2>
            <p className="text-sm text-neutral-400 mb-7 max-w-sm mx-auto leading-relaxed">
              Join developers and students using DevBoard to stay on top of
              their projects, tasks, and todos.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 active:scale-[0.98] transition-all"
            >
              Start Building Today
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-neutral-900 flex items-center justify-center">
              <Zap size={10} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-neutral-900">
              DevBoard
            </span>
          </div>
          <div className="flex items-center gap-5 text-sm text-neutral-400">
            <a
              href="#features"
              className="hover:text-neutral-700 transition-colors"
            >
              Features
            </a>
            <a
              href="/dashboard/projects"
              className="hover:text-neutral-700 transition-colors"
            >
              Projects
            </a>
            <a
              href="/dashboard/todos"
              className="hover:text-neutral-700 transition-colors"
            >
              Todos
            </a>
          </div>
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} DevBoard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
