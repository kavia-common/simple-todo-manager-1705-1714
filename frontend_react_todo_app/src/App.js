import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import "./styles/theme.css";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import EmptyState from "./components/EmptyState";
import AddTodo from "./components/AddTodo";
import todoStorage, { isBackendMode, api, local } from "./utils/todoStorage";

// PUBLIC_INTERFACE
function App() {
  // For accessibility: still offer theme toggle (carryover from template)
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Core todo logic (state and management)
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all"); // "all" | "active" | "completed"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Storage backend selection
  const storage = isBackendMode() ? api : local;

  // Load todos on mount/storage switch
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");
    storage
      .getTodos()
      .then((t) => {
        if (isMounted) setTodos(t || []);
      })
      .catch((e) => {
        if (isMounted) setError("Failed loading todos!");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [storage]);

  // Helper for reloading
  const reloadTodos = useCallback(() => {
    setLoading(true);
    setError("");
    storage
      .getTodos()
      .then((t) => setTodos(t || []))
      .catch(() => setError("Failed loading todos!"))
      .finally(() => setLoading(false));
  }, [storage]);

  // Add
  const handleAddTodo = (text) => {
    setError("");
    storage
      .addTodo(text)
      .then((newTodo) => {
        if (isBackendMode()) reloadTodos();
        else setTodos((prev) => [...prev, newTodo]);
      })
      .catch(() => setError("Couldn't add new todo."));
  };

  // Toggle
  const handleToggle = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    setError("");
    storage
      .toggleTodo(id, !todo.completed)
      .then(() => {
        if (isBackendMode()) reloadTodos();
        else
          setTodos((prev) =>
            prev.map((t) =>
              t.id === id ? { ...t, completed: !t.completed } : t
            )
          );
      })
      .catch(() => setError("Couldn't update todo."));
  };

  // Delete
  const handleDelete = (id) => {
    setError("");
    storage
      .deleteTodo(id)
      .then(() => {
        if (isBackendMode()) reloadTodos();
        else setTodos((prev) => prev.filter((t) => t.id !== id));
      })
      .catch(() => setError("Couldn't delete todo."));
  };

  // Filter
  const filteredTodos = todos.filter((t) => {
    if (status === "all") return true;
    if (status === "active") return !t.completed;
    if (status === "completed") return t.completed;
    return true;
  });

  // Count
  const remaining = todos.filter((t) => !t.completed).length;

  // Clear Completed
  const handleClearCompleted = () => {
    setError("");
    storage
      .clearCompleted()
      .then(() => {
        if (isBackendMode()) reloadTodos();
        else setTodos((prev) => prev.filter((t) => !t.completed));
      })
      .catch(() => setError("Couldn't clear completed todos."));
  };

  // Keyboard filter navigation
  function handleKeyDownFilter(e, val) {
    if (e.key === "Enter" || e.key === " ") {
      setStatus(val);
    }
  }

  return (
    <div className="ocean-bg" style={{ minHeight: "100vh" }}>
      <div className="ocean-surface" role="main">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Header />
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{ position: "static" }}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
        <div className="todo-status-bar" aria-label="Status and filters">
          <span aria-label="Todos remaining">{remaining} left</span>
          <nav className="todo-filters" aria-label="Todo filter">
            {["all", "active", "completed"].map((val) => (
              <button
                key={val}
                type="button"
                className={
                  "todo-filter-btn" +
                  (status === val ? " active" : "")
                }
                aria-pressed={status === val}
                tabIndex={0}
                aria-label={`Show ${val} todos`}
                onClick={() => setStatus(val)}
                onKeyDown={(e) => handleKeyDownFilter(e, val)}
              >
                {val[0].toUpperCase() + val.slice(1)}
              </button>
            ))}
          </nav>
          <button
            className="clear-completed-btn"
            type="button"
            aria-label="Clear completed todos"
            onClick={handleClearCompleted}
            disabled={!todos.some((t) => t.completed)}
          >
            Clear Completed
          </button>
        </div>

        {error && (
          <div style={{
            color: "var(--error)",
            padding: "0.8rem 0 0.3rem 0",
            background: "#fee2e2",
            borderRadius: "10px",
            marginBottom: "1rem"
          }} role="alert" tabIndex={0}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ color: "#789", fontSize: "1.08rem", padding: "1.6rem 0" }}>Loading...</div>
        ) : !filteredTodos.length ? (
          <EmptyState />
        ) : (
          <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} />
        )}

        <AddTodo onAdd={handleAddTodo} />
      </div>
    </div>
  );
}

export default App;
