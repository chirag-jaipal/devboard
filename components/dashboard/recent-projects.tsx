import Link from "next/link";

interface Project {
  id: string;
  title: string;
  status: string;
}

interface RecentProjectsProps {
  projects: Project[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <div>
      <h2>Recent Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id}>
            <Link href={`/dashboard/projects/${project.id}`}>
              {project.title}
            </Link>
            <p>{project.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
