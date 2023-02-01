import React from "react";
import { D1 } from "./";

export function Usuario(props) {
  const { criteria, setCriteria, qData } = props;
  return (
    <>
      <div>D Usuario</div>
      {criteria.qIndex === 0 ? (
        <D1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 1 ? (
        <D1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 2 ? (
        <D1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 3 ? (
        <D1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : (
        <h2>Otro</h2>
      )}
    </>
  );
}
