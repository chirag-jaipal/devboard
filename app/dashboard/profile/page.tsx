import { getCurrentUser } from "@/lib/auth";
import { getUserStats } from "@/lib/services/user.service";
import {
  FolderKanban,
  CheckSquare,
  CheckCheck,
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Zap,
} from "lucide-react";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-neutral-400">User not found.</p>
      </div>
    );
  }

  const stats = await getUserStats(user.id);

  const initials =
    user.name
      ?.split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "?";

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
          Account
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Profile
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Manage your account and workspace information.
        </p>
      </div>

      {/* ── Profile Hero Card ── */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {/* Top banner strip */}
        <div className="h-16 bg-neutral-50 border-b border-neutral-100" />

        <div className="px-6 pb-6">
          {/* Avatar — overlapping the banner */}
          <div className="-mt-8 mb-4 flex items-end justify-between">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl bg-neutral-900 flex items-center justify-center ring-4 ring-white shadow-sm">
                <span className="text-lg font-semibold text-white select-none">
                  {initials}
                </span>
              </div>
              {/* Online dot */}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
            </div>
            {/* Workspace Owner badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
              <Zap size={9} strokeWidth={2.5} />
              Workspace Owner
            </span>
          </div>

          {/* Name + email */}
          <div className="space-y-0.5 mb-3">
            <h2 className="text-base font-semibold text-neutral-900 tracking-tight">
              {user.name}
            </h2>
            <p className="text-sm text-neutral-500">{user.email}</p>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              Demo User
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Active
            </span>
          </div>
        </div>
      </div>

      {/* ── Workspace Statistics ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: FolderKanban,
            label: "Projects",
            value: stats.projects,
            sub: "Total projects created",
          },
          {
            icon: CheckSquare,
            label: "Tasks",
            value: stats.tasks,
            sub: "Across all projects",
          },
          {
            icon: CheckCheck,
            label: "Todos",
            value: stats.todos,
            sub: "Personal todo items",
          },
        ].map(({ icon: Icon, label, value, sub }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-neutral-100 p-5"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mb-3">
              <Icon size={14} strokeWidth={1.8} className="text-neutral-600" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">
              {label}
            </p>
            <p className="text-3xl font-semibold text-neutral-900 tracking-tight">
              {value}
            </p>
            <p className="text-xs text-neutral-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Bottom grid: Account Info + Workspace Summary ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Account Information */}
        <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-0.5">
              Account
            </p>
            <h2 className="text-sm font-semibold text-neutral-900">
              Account Information
            </h2>
          </div>
          <div className="divide-y divide-neutral-100">
            {[
              { icon: User, label: "Name", value: user.name },
              { icon: Mail, label: "Email", value: user.email },
              { icon: ShieldCheck, label: "Account Type", value: "Demo User" },
              { icon: Calendar, label: "Member Since", value: "June 2026" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    size={13}
                    strokeWidth={1.8}
                    className="text-neutral-400 shrink-0"
                  />
                  <span className="text-xs font-medium text-neutral-500">
                    {label}
                  </span>
                </div>
                <span className="text-xs font-medium text-neutral-800 text-right max-w-[180px] truncate">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace Summary */}
        <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-0.5">
              Workspace
            </p>
            <h2 className="text-sm font-semibold text-neutral-900">
              Workspace Summary
            </h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            {/* Mini stat row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Projects", value: stats.projects },
                { label: "Tasks", value: stats.tasks },
                { label: "Todos", value: stats.todos },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-neutral-50 rounded-lg border border-neutral-100 px-3 py-2.5 text-center"
                >
                  <p className="text-lg font-semibold text-neutral-900">
                    {value}
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-100" />

            {/* Productivity overview */}
            <div>
              <p className="text-xs font-semibold text-neutral-700 mb-1">
                Productivity Overview
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                This workspace currently contains{" "}
                <span className="font-medium text-neutral-700">
                  {stats.projects} active project
                  {stats.projects !== 1 ? "s" : ""}
                </span>
                ,{" "}
                <span className="font-medium text-neutral-700">
                  {stats.tasks} tracked task{stats.tasks !== 1 ? "s" : ""}
                </span>
                , and{" "}
                <span className="font-medium text-neutral-700">
                  {stats.todos} personal todo{stats.todos !== 1 ? "s" : ""}
                </span>
                . Keep it up.
              </p>
            </div>

            {/* Progress bar — tasks completion visual */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                  Workspace Activity
                </span>
                <span className="text-[10px] text-neutral-400">
                  {stats.projects + stats.tasks + stats.todos} total items
                </span>
              </div>
              <div className="flex h-1.5 rounded-full overflow-hidden bg-neutral-100 gap-px">
                {stats.projects > 0 && (
                  <div
                    className="bg-neutral-700 rounded-full transition-all"
                    style={{
                      width: `${(stats.projects / (stats.projects + stats.tasks + stats.todos)) * 100}%`,
                    }}
                  />
                )}
                {stats.tasks > 0 && (
                  <div
                    className="bg-blue-400 rounded-full transition-all"
                    style={{
                      width: `${(stats.tasks / (stats.projects + stats.tasks + stats.todos)) * 100}%`,
                    }}
                  />
                )}
                {stats.todos > 0 && (
                  <div
                    className="bg-neutral-300 rounded-full transition-all"
                    style={{
                      width: `${(stats.todos / (stats.projects + stats.tasks + stats.todos)) * 100}%`,
                    }}
                  />
                )}
              </div>
              <div className="flex items-center gap-4 mt-2">
                {[
                  { color: "bg-neutral-700", label: "Projects" },
                  { color: "bg-blue-400", label: "Tasks" },
                  { color: "bg-neutral-300", label: "Todos" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${color}`} />
                    <span className="text-[10px] text-neutral-400">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
