import React from "react";
import { A1 } from "../Introduccion";
import { B1, B2, B3, B4 } from "../Identificacion";
import "./Survey.scss";

export function Survey(props) {
  const { criteria, setCriteria, qData } = props;

  return (
    <div className="tac-form">
      {criteria.qIndex === 0 ? (
      <B1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 1 ? (
        <B2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 2 ? (
        <B3 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : (
        <B4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      )}
    </div>
  );
}
