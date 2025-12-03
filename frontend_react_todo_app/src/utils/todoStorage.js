const API_BASE =
  process.env.REACT_APP_API_BASE?.trim() ||
  process.env.REACT_APP_BACKEND_URL?.trim() ||
  "";

// True if integration with backend, false otherwise
export const isBackendMode = () => Boolean(API_BASE);

const LOCAL_STORAGE_KEY = "todos";

// Generate unique id for todos
function genId() {
  // Simple unique ID for demo
  return (
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 7)
  );
}

const seedTodos = [
  { id: genId(), text: "Get started with Ocean Todos", completed: false },
  { id: genId(), text: "Style your todo app!", completed: true },
  { id: genId(), text: "Click a todo to mark complete", completed: false }
];

//---------------- API MODE
async function apiRequest(method, endpoint, body) {
  const url = API_BASE.replace(/\/+$/, "") + endpoint;
  const opts = {
    method,
    headers: { "Content-Type": "application/json" }
  };
  if (body != null) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return await res.json();
}

export const api = {
  async getTodos() {
    return await apiRequest("GET", "/todos");
  },
  async addTodo(text) {
    // API should accept POST /todos {text}
    return await apiRequest("POST", "/todos", { text });
  },
  async toggleTodo(id, completed) {
    return await apiRequest("PATCH", `/todos/${id}`, { completed });
  },
  async deleteTodo(id) {
    return await apiRequest("DELETE", `/todos/${id}`);
  },
  async clearCompleted() {
    // If endpoint not implemented, just loop
    const todos = await api.getTodos();
    const completedIds = todos
      .filter((t) => t.completed)
      .map((t) => t.id);
    await Promise.all(completedIds.map(api.deleteTodo));
  }
};

//---------------- LOCAL MODE
function loadLocalTodos() {
  let todos = [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) todos = JSON.parse(raw);
  } catch (e) {}
  // Bootstrap seed on FIRST run
  if (!todos || !Array.isArray(todos) || todos.length === 0) {
    todos = seedTodos;
    saveLocalTodos(todos);
  }
  return todos;
}

function saveLocalTodos(todos) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}

export const local = {
  getTodos() {
    return Promise.resolve(loadLocalTodos());
  },
  addTodo(text) {
    const todos = loadLocalTodos();
    const newTodo = { id: genId(), text, completed: false };
    const all = [...todos, newTodo];
    saveLocalTodos(all);
    return Promise.resolve(newTodo);
  },
  toggleTodo(id, completed) {
    let todos = loadLocalTodos();
    todos = todos.map((t) =>
      t.id === id ? { ...t, completed } : t
    );
    saveLocalTodos(todos);
    return Promise.resolve();
  },
  deleteTodo(id) {
    let todos = loadLocalTodos();
    todos = todos.filter((t) => t.id !== id);
    saveLocalTodos(todos);
    return Promise.resolve();
  },
  clearCompleted() {
    let todos = loadLocalTodos();
    todos = todos.filter((t) => !t.completed);
    saveLocalTodos(todos);
    return Promise.resolve();
  }
};

export default {
  isBackendMode,
  api,
  local
};
