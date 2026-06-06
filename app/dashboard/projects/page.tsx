import { ProjectCard } from "@/components/projects/project-card";
import { getCurrentUser } from "@/lib/auth";
import { getProjects } from "@/lib/services/project.service";
import Link from "next/link";
import { FolderKanban, Plus } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/signin");
  }

  const userId: string = user.id;
  const projects = await getProjects(userId);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
            Workspace
          </p>
          <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
            Projects
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            {projects.length === 0
              ? "No projects yet. Create one to get started."
              : `${projects.length} project${projects.length !== 1 ? "s" : ""} in your workspace`}
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors shrink-0"
        >
          <Plus size={15} strokeWidth={2.5} />
          New Project
        </Link>
      </div>

      {/* Empty State */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-neutral-200 rounded-xl">
          <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
            <FolderKanban
              size={22}
              className="text-neutral-400"
              strokeWidth={1.8}
            />
          </div>
          <p className="text-sm font-semibold text-neutral-700 mb-1">
            No projects yet
          </p>
          <p className="text-xs text-neutral-400 mb-6 text-center max-w-xs">
            Create your first project to start tracking tasks and progress.
          </p>
          <Link
            href="/dashboard/projects/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            <Plus size={14} strokeWidth={2.5} />
            Create your first project
          </Link>
        </div>
      ) : (
        /* Project Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="group block"
            >
              <ProjectCard
                projectId={project.id}
                title={project.title}
                status={project.status}
                createdAt={project.createdAt}
                taskCount={project.taskCount}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
