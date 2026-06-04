import { ProjectDetails } from "@/components/projects/project-details";
import { getProjectById } from "@/lib/services/project.service";
import { getTasksByProjectId } from "@/lib/services/task.service";
import { TaskCard } from "@/components/tasks/task-card";
import { getCurrentUser } from "@/lib/auth";

import { notFound } from "next/navigation";
import Link from "next/link";

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

      <Link href={`/dashboard/projects/${projectId}/tasks/new`}>
        Create Task
      </Link>

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
