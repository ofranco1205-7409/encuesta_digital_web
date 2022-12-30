import React from "react";
import "./AdminLayout.scss";

export function AdminLayout(props) {
  const { children } = props;

  return (
    <div>
      <h2> En adminLayout</h2>;{children}
    </div>
  );
}
