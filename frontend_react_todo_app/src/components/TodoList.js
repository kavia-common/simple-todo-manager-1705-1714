import React from "react";
import TodoItem from "./TodoItem";

// PUBLIC_INTERFACE
function TodoList({
  todos,
  onToggle,
  onDelete
}) {
  if (!todos.length) return null;

  return (
    <ul className="todo-list-ul" aria-label="Todo list">
      {todos.map(todo =>
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      )}
    </ul>
  );
}

export default TodoList;
