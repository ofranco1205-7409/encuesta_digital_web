import React from "react";
import {
  C1_1,
  C1_2,
  C1_3,
  C1_4,
  C1_5,
  C1_6,
  C1_7,
  C1_8,
  C1_9,
  C2_1,
  C2_2,
  C3_1,
  C3_2,
  C4_1,
  C4_2,
  C4_3,
  C4_4,
  C5_1,
} from "./";

export function Operador(props) {
  const { criteria, setCriteria, qData } = props;
  return (
    <>
      {criteria.qIndex === 0 ? (
        <C1_1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 1 ? (
        <C1_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 2 ? (
        <C1_3 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 3 ? (
        <C1_4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 4 ? (
        <C1_5 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 5 ? (
        <C1_6 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 6 ? (
        <C1_7 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 7 ? (
        <C1_8 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 8 ? (
        <C1_9 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 9 ? (
        <C2_1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 10 ? (
        <C2_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 11 ? (
        <C3_1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 12 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 13 ? (
        <C4_1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 14 ? (
        <C4_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 15 ? (
        <C4_3 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 16 ? (
        <C4_4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 17 ? (
        <C5_1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 18 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 19 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 20 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 21 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 22 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 23 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 24 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 25 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 26 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 27 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 28 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 29 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 30 ? (
        <C3_2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : (
        <h2>Error: No se encontro pregunta</h2>
      )}
    </>
  );
}
