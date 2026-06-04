import { ProjectStatus } from "@/app/generated/prisma/client";
import { ProjectStatusSelect } from "./project-status-select";

interface ProjectDetailsProps {
  title: string;
  description: string | null;
  status: ProjectStatus;
  createdAt: Date;
  taskCount: number;
  projectId: string;
}

export function ProjectDetails({
  projectId,
  title,
  description,
  status,
  createdAt,
  taskCount,
}: ProjectDetailsProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <ProjectStatusSelect projectId={projectId} currentStatus={status} />
      <p>Created At: {createdAt.toLocaleString()}</p>
      <p>Total Tasks: {taskCount}</p>
    </div>
  );
}
