import React from "react";
import { C1_4 } from "./";

export function Operador(props) {
  const { criteria, setCriteria, qData } = props;
  return (
    <>
      <div>C Operador</div>
      {criteria.qIndex === 0 ? (
        <C1_4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 1 ? (
        <C1_4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 2 ? (
        <C1_4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 3 ? (
        <C1_4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : (
        <C1_4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      )}
    </>
  );
}
