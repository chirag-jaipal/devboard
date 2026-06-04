import {
  FolderKanban,
  Zap,
  CheckSquare,
  ListTodo,
  Activity,
} from "lucide-react";

interface StatsGridProps {
  totalProjects: number;
  activeProjects: number;
  totalTasks: number;
  completedTasks: number;
  totalTodos: number;
}

interface StatCardProps {
  label: string;
  value: number;
  sub?: string;
  icon: React.ElementType;
  accent: string;
  iconBg: string;
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  iconBg,
}: StatCardProps) {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-5 flex flex-col gap-4 hover:border-neutral-200 hover:shadow-sm transition-all duration-150">
      <div className="flex items-start justify-between">
        <div
          className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center`}
        >
          <Icon size={16} className={accent} strokeWidth={2} />
        </div>
        {sub && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 bg-neutral-50 px-2 py-1 rounded-md">
            {sub}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-semibold text-neutral-900 tabular-nums tracking-tight">
          {value}
        </p>
        <p className="text-xs text-neutral-400 mt-0.5 font-medium">{label}</p>
      </div>
    </div>
  );
}

export function StatsGrid({
  totalProjects,
  activeProjects,
  totalTasks,
  completedTasks,
  totalTodos,
}: StatsGridProps) {
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats: StatCardProps[] = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: FolderKanban,
      accent: "text-neutral-700",
      iconBg: "bg-neutral-100",
    },
    {
      label: "Active Projects",
      value: activeProjects,
      sub: "Active",
      icon: Activity,
      accent: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: Zap,
      accent: "text-neutral-700",
      iconBg: "bg-neutral-100",
    },
    {
      label: "Completed Tasks",
      value: completedTasks,
      sub: `${completionRate}%`,
      icon: CheckSquare,
      accent: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      label: "Total Todos",
      value: totalTodos,
      icon: ListTodo,
      accent: "text-violet-600",
      iconBg: "bg-violet-50",
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
