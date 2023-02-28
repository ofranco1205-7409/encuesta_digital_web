import React from "react";
import { B1, B2, B3, B4, B5, B6, B7, B8 } from "./";

export function Identificacion(props) {
  const { criteria, setCriteria, qData } = props;
  return (
    <>
      <h3>Identificacion {criteria.qID}</h3>
      {criteria.qIndex === 0 ? (
        <B1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 1 ? (
        <B2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 2 ? (
        <B3 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 3 ? (
        <B4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 4 ? (
        <B5 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 5 ? (
        <B6 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 6 ? (
        <B7 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 7 ? (
        <B8 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : (
        <h2>Error: No se encontro pregunta</h2>
      )}
    </>
  );
}
