interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;

  project: {
    title: string;
  };
}

interface RecentTasksProps {
  tasks: Task[];
}

export function RecentTasks({ tasks }: RecentTasksProps) {
  return (
    <div>
      <h2>Recent Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>Project: {task.project.title}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
          </div>
        ))
      )}
    </div>
  );
}
