import { createTodoAction } from "@/app/actions/todo.actions";

export default function NewTodoPage() {
  return (
    <div>
      <h1>Create Todo</h1>

      <form action={createTodoAction}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" required />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" />
        </div>

        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
}
