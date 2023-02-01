import React from "react";
import { A1, A2 } from "./";

export function Introduccion(props) {
  const { criteria, setCriteria, qData } = props;
  return (
    <>
      {criteria.qIndex === 0 ? (
        <A1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 1 ? (
        <A2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : (
        <h2>Error: No se encontro pregunta</h2>
      )}
    </>
  );
}
