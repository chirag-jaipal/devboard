import { getProjectById } from "@/lib/services/project.service";
import { createTaskAction } from "@/app/actions/task.actions";
import { getTasksByProjectId } from "@/lib/services/task.service";
import { getCurrentUser } from "@/lib/auth";

import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { projectId } = await params;

  const user = await getCurrentUser();
  if (!user) return <p>Please login to continue.</p>;

  const project = await getProjectById(projectId, user.id);
  if (!project) notFound();

  const tasks = await getTasksByProjectId(projectId, user.id);

  const createTaskForProject = createTaskAction.bind(null, projectId);

  return (
    <div>
      <h1>{project.title}</h1>

      <p>{project.description}</p>

      <p>Status: {project.status}</p>

      <p>Created At: {project.createdAt.toLocaleDateString()}</p>

      <p>Total Tasks: {project.taskCount}</p>

      <hr />

      <h2>Create Task</h2>

      <form action={createTaskForProject}>
        <div>
          <label htmlFor="title">Title</label>

          <input id="title" name="title" type="text" required maxLength={65} />
        </div>

        <div>
          <label htmlFor="description">Description</label>

          <textarea id="description" name="description" maxLength={500} />
        </div>

        <button type="submit">Create Task</button>
      </form>

      <hr />

      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>

            <p>Status: {task.status}</p>

            <p>Priority: {task.priority}</p>

            {task.dueDate && <p>Due: {task.dueDate.toLocaleDateString()}</p>}
          </div>
        ))
      )}
    </div>
  );
}
