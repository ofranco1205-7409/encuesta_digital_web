import React from "react";
import { BrowserRouter } from "react-router-dom";
import { WebRouter, AdminRouter } from "./router";
import { AuthProvider, FolioProvider } from "./contexts";

export default function App() {
  return (
    <AuthProvider>
      <FolioProvider>
        <BrowserRouter>
          <WebRouter />
          <AdminRouter />
        </BrowserRouter>
      </FolioProvider>
    </AuthProvider>
  );
}
