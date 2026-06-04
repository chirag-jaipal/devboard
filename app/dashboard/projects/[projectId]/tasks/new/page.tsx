import { createTaskAction } from "@/app/actions/task.actions";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function NewTaskPage({ params }: Props) {
  const { projectId } = await params;

  const createTaskForProject = createTaskAction.bind(null, projectId);

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
          Tasks
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Create Task
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Add a task to this project and start tracking progress.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <form
          action={createTaskForProject}
          className="divide-y divide-neutral-100"
        >
          {/* Title */}
          <div className="px-6 py-5">
            <label
              htmlFor="title"
              className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g. Set up authentication"
              className="w-full text-base text-neutral-900 placeholder:text-neutral-300 bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* Description */}
          <div className="px-6 py-5">
            <label
              htmlFor="description"
              className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3"
            >
              Description
              <span className="ml-1.5 normal-case tracking-normal font-normal text-neutral-300">
                — optional
              </span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Add any notes or context…"
              className="w-full text-sm text-neutral-900 placeholder:text-neutral-300 bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
            <a
              href={`/dashboard/projects/${projectId}`}
              className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 active:scale-[0.98] transition-all"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
