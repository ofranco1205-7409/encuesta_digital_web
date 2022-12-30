import React from "react";

export function ClientLayout(props) {
  const { children } = props;

  return (
    <div className="client-layout">
      <h2>En client Layout</h2> {children}
    </div>
  );
}
