interface StatsGridProps {
  totalProjects: number;
  activeProjects: number;
  totalTasks: number;
  completedTasks: number;
  totalTodos: number;
}

export function StatsGrid({
  totalProjects,
  activeProjects,
  totalTasks,
  completedTasks,
  totalTodos,
}: StatsGridProps) {
  return (
    <div>
      <h2>Stats</h2>

      <p>Total Projects: {totalProjects}</p>

      <p>Active Projects: {activeProjects}</p>

      <p>Total Tasks: {totalTasks}</p>

      <p>Completed Tasks: {completedTasks}</p>

      <p>Total Todos: {totalTodos}</p>
    </div>
  );
}
