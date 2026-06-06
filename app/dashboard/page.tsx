import { getCurrentUser } from "@/lib/auth";
import {
  getDashboardStats,
  getRecentProjects,
  getRecentTasks,
  getRecentTodos,
} from "@/lib/services/dashboard.service";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { RecentTasks } from "@/components/dashboard/recent-tasks";
import { RecentTodos } from "@/components/dashboard/recent-todos";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-neutral-400">Please login to continue.</p>
      </div>
    );
  }

  const [stats, recentProjects, recentTasks, recentTodos] = await Promise.all([
    getDashboardStats(user.id),
    getRecentProjects(user.id),
    getRecentTasks(user.id),
    getRecentTodos(user.id),
  ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-1">
          Overview
        </p>
        <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
          Welcome back, {user.name}
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Here&apos;s what&apos;s happening across your workspace.
        </p>
      </div>
      {/* Stats */}
      <StatsGrid
        totalProjects={stats.totalProjects}
        activeProjects={stats.activeProjects}
        totalTasks={stats.totalTasks}
        completedTasks={stats.completedTasks}
        totalTodos={stats.totalTodos}
      />
      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentProjects projects={recentProjects} />
        <RecentTodos todos={recentTodos} />
      </div>
      {/* Tasks — full width */}
      <RecentTasks tasks={recentTasks} />
    </div>
  );
}
