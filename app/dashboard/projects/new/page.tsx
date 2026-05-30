import { createProjectAction } from "@/app/actions/project.actions";

export default function NewProjectPage() {
  return (
    <div>
      <h1>Create Project</h1>

      <form action={createProjectAction}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" required maxLength={65} />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" maxLength={500} />
        </div>

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}
