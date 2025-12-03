import React from "react";

// PUBLIC_INTERFACE
function TodoItem({
  todo,
  onToggle,
  onDelete,
  ...props
}) {
  return (
    <li
      className={`todo-item${todo.completed ? " completed" : ""}`}
      tabIndex={-1}
      data-testid={`todoitem-${todo.id}`}
      aria-label={todo.completed ? `${todo.text}, completed` : todo.text}
      {...props}
    >
      <input
        className="todo-checkbox"
        type="checkbox"
        checked={!!todo.completed}
        aria-label={todo.completed ? "Mark as not completed" : "Mark as completed"}
        onChange={() => onToggle(todo.id)}
        tabIndex={0}
      />
      <label
        className="todo-label"
        htmlFor={null}
        tabIndex={0}
        aria-checked={todo.completed}
        style={{ flex: 1, cursor: "pointer" }}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </label>
      <button
        className="todo-delete-btn"
        aria-label={`Delete todo: ${todo.text}`}
        title="Delete"
        onClick={() => onDelete(todo.id)}
        tabIndex={0}
      >
        &#10005;
      </button>
    </li>
  );
}

export default TodoItem;
