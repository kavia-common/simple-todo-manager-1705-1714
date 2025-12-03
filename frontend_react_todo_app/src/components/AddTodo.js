import React, { useState, useRef } from "react";

// PUBLIC_INTERFACE
function AddTodo({ onAdd }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onAdd(trimmed);
      setValue("");
      inputRef.current?.focus();
    }
  };

  return (
    <form className="add-todo-bar" role="form" onSubmit={handleAdd} autoComplete="off">
      <label htmlFor="addTodoInput" className="sr-only">
        Add todo
      </label>
      <input
        ref={inputRef}
        id="addTodoInput"
        className="add-todo-input"
        type="text"
        placeholder="Add a new todo..."
        value={value}
        onChange={e => setValue(e.target.value)}
        aria-label="Add new todo"
        maxLength={200}
        tabIndex={0}
      />
      <button
        className="add-todo-btn"
        aria-label="Submit new todo"
        type="submit"
        disabled={!value.trim()}
        tabIndex={0}
      >
        Add
      </button>
    </form>
  );
}

export default AddTodo;
