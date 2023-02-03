import React from "react";
import { B1, B2, B3, B4 } from "./";

export function Identificacion(props) {
  const { criteria, setCriteria, qData } = props;
  return (
    <>
      {criteria.qIndex === 0 ? (
        <B1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 1 ? (
        <B2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 2 ? (
        <B3 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 3 ? (
        <B4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : (
        <h2>Otro</h2>
      )}
    </>
  );
}
