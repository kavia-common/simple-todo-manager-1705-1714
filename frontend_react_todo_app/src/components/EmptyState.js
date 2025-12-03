import React from "react";

// PUBLIC_INTERFACE
function EmptyState() {
  return (
    <div className="todo-empty-state" tabIndex={0}>
      No todos here yet.<br />
      Get started by adding your first task!
    </div>
  );
}

export default EmptyState;
