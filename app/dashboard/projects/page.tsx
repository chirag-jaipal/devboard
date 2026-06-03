import { ProjectCard } from "@/components/projects/project-card";
import { getCurrentUser } from "@/lib/auth";
import { getProjects } from "@/lib/services/project.service";
import Link from "next/link";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) return <p>Please login to continue.</p>;

  const projects = await getProjects(user.id);

  if (projects.length === 0) {
    return (
      <div>
        <h1>Projects</h1>
        <p>No projects found.</p>
        <Link href="/dashboard/projects/new">Create your first project</Link>
      </div>
    );
  }

  return (
    <div>
      {projects.map((project) => {
        return (
          <Link href={`/dashboard/projects/${project.id}`}>
            <ProjectCard
              key={project.id}
              title={project.title}
              status={project.status}
              createdAt={project.createdAt}
              taskCount={project.taskCount}
            />
          </Link>
        );
      })}
    </div>
  );
}
