import React from "react";

// PUBLIC_INTERFACE
function Header() {
  return (
    <header className="ocean-header" role="banner">
      <h1 className="ocean-title" tabIndex={0}>Ocean Todos</h1>
    </header>
  );
}

export default Header;
