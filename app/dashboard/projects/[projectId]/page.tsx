import { ProjectDetails } from "@/components/projects/project-details";
import { getProjectById } from "@/lib/services/project.service";
import { getTasksByProjectId } from "@/lib/services/task.service";
import { TaskCard } from "@/components/tasks/task-card";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Zap } from "lucide-react";

type PageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { projectId } = await params;

  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/signin");
  }

  const userId: string = user.id;
  const project = await getProjectById(projectId, userId);
  if (!project) notFound();

  const tasks = await getTasksByProjectId(projectId, userId);

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <ProjectDetails
        key={projectId}
        projectId={projectId}
        title={project.title}
        description={project.description}
        status={project.status}
        createdAt={project.createdAt}
        taskCount={project.taskCount}
      />

      {/* Tasks Section */}
      <section className="bg-white border border-neutral-100 rounded-xl overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-neutral-100 flex items-center justify-center">
              <Zap size={14} className="text-neutral-600" strokeWidth={2} />
            </div>
            <h2 className="text-sm font-semibold text-neutral-800">Tasks</h2>
            {tasks.length > 0 && (
              <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
                {tasks.length}
              </span>
            )}
          </div>
          <Link
            href={`/dashboard/projects/${projectId}/tasks/new`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-700 transition-colors"
          >
            <Plus size={13} strokeWidth={2.5} />
            Create Task
          </Link>
        </div>

        {/* Table Header */}
        {tasks.length > 0 && (
          <div className="grid grid-cols-12 px-5 py-2.5 bg-neutral-50/80 border-b border-neutral-100">
            <span className="col-span-5 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              Task
            </span>
            <span className="col-span-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              Status
            </span>
            <span className="col-span-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              Priority
            </span>
            <span className="col-span-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 text-right"></span>
          </div>
        )}

        {/* Task Rows */}
        <div className="divide-y divide-neutral-50">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-3">
                <Zap size={18} className="text-neutral-300" strokeWidth={1.8} />
              </div>
              <p className="text-sm font-semibold text-neutral-600 mb-1">
                No tasks yet
              </p>
              <p className="text-xs text-neutral-400 mb-5 text-center max-w-xs">
                Break this project into tasks to start tracking progress.
              </p>
              <Link
                href={`/dashboard/projects/${projectId}/tasks/new`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-700 transition-colors"
              >
                <Plus size={13} strokeWidth={2.5} />
                Create your first task
              </Link>
            </div>
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
      </section>
    </div>
  );
}
