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
    return <p>Please login.</p>;
  }

  const [stats, recentProjects, recentTasks, recentTodos] = await Promise.all([
    getDashboardStats(user.id),
    getRecentProjects(user.id),
    getRecentTasks(user.id),
    getRecentTodos(user.id),
  ]);

  return (
    <div>
      <h1>Welcome, {user.name}</h1>

      <StatsGrid
        totalProjects={stats.totalProjects}
        activeProjects={stats.activeProjects}
        totalTasks={stats.totalTasks}
        completedTasks={stats.completedTasks}
        totalTodos={stats.totalTodos}
      />

      <hr />

      <RecentProjects projects={recentProjects} />

      <hr />

      <RecentTasks tasks={recentTasks} />

      <hr />

      <RecentTodos todos={recentTodos} />
    </div>
  );
}
