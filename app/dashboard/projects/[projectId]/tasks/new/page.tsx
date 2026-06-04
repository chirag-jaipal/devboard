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
    <div>
      <h1>Create Task</h1>

      <form action={createTaskForProject}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" required />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" />
        </div>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}
