import Link from "next/link";
import { FolderKanban, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  status: string;
}

interface RecentProjectsProps {
  projects: Project[];
}

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  completed: "bg-blue-50 text-blue-700 border-blue-100",
  archived: "bg-neutral-100 text-neutral-500 border-neutral-200",
  paused: "bg-amber-50 text-amber-700 border-amber-100",
};

function statusStyle(status: string) {
  return (
    STATUS_STYLES[status.toLowerCase()] ??
    "bg-neutral-100 text-neutral-500 border-neutral-200"
  );
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <section className="bg-white border border-neutral-100 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-neutral-100 flex items-center justify-center">
            <FolderKanban
              size={14}
              className="text-neutral-600"
              strokeWidth={2}
            />
          </div>
          <h2 className="text-sm font-semibold text-neutral-800">
            Recent Projects
          </h2>
        </div>
        <Link
          href="/dashboard/projects"
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-700 transition-colors font-medium"
        >
          View all
          <ArrowRight size={12} strokeWidth={2} />
        </Link>
      </div>

      {/* Body */}
      <div className="divide-y divide-neutral-50">
        {projects.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-xs text-neutral-400">No projects yet.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-neutral-50/60 transition-colors group"
            >
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors truncate max-w-[60%]"
              >
                {project.title}
              </Link>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusStyle(project.status)}`}
              >
                {project.status}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
