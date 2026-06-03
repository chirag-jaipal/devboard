import { getCurrentUser } from "@/lib/auth";
import { getProjectById } from "@/lib/services/project.service";
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

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>
      <p>Created At: {project.createdAt.toLocaleDateString()}</p>
      <p>Total Tasks: {project.taskCount}</p>
    </div>
  );
}
