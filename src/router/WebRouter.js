import React from "react";
import { Routes, Route } from "react-router-dom";
import { ClientLayout } from "../layouts";
import { Home, Courses, Blog, Post, EncuestaTac, Folio } from "../pages/web";
import { EndSurvey } from "../pages/web/EndSurvey";

import { useFolio } from "../hooks";

export function WebRouter() {
  const { folio } = useFolio();

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!folio ? (
        <>
          <Route path="/" element={loadLayout(ClientLayout, Home)} />
          <Route path="/tac/*" element={<Folio />} />
        </>
      ) : (
        <>
          <Route path="/" element={loadLayout(ClientLayout, Home)} />
          <Route path="/cursos" element={loadLayout(ClientLayout, Courses)} />
          <Route path="/blog" element={loadLayout(ClientLayout, Blog)} />
          <Route path="/blog/:path" element={loadLayout(ClientLayout, Post)} />
          <Route path="/tac" element={loadLayout(ClientLayout, EncuestaTac)} />
          <Route path="/tacEnd/*" element={<EndSurvey />} />
        </>
      )}
    </Routes>
  );
}
