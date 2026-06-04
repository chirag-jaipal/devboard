import { ProjectDetails } from "@/components/projects/project-details";
import { getProjectById } from "@/lib/services/project.service";
import { createTaskAction } from "@/app/actions/task.actions";
import { getTasksByProjectId } from "@/lib/services/task.service";
import { TaskCard } from "@/components/tasks/task-card";
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

  console.log(project.status);

  const tasks = await getTasksByProjectId(projectId, user.id);

  const createTaskForProject = createTaskAction.bind(null, projectId);

  return (
    <div>
      <ProjectDetails
        key={projectId}
        projectId={projectId}
        title={project.title}
        description={project.description}
        status={project.status}
        createdAt={project.createdAt}
        taskCount={project.taskCount}
      />

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
          <TaskCard
            key={task.id}
            taskId={task.id}
            projectId={projectId}
            title={task.title}
            status={task.status}
            priority={task.priority}
            dueDate={task.dueDate}
          />
        ))
      )}
    </div>
  );
}
