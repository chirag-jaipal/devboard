interface Todo {
  id: string;
  title: string;
  status: string;
}

interface RecentTodosProps {
  todos: Todo[];
}

export function RecentTodos({ todos }: RecentTodosProps) {
  return (
    <div>
      <h2>Recent Todos</h2>

      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
