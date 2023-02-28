import React from "react";
import {
  U1,
  U2,
  U3,
  U4,
  U5,
  U6,
  U7,
  U8,
  U9,
  U10,
  U11,
  U12,
  U13,
  U14,
  U15,
  U16,
  U17,
  U18,
} from "./";

export function Usuario(props) {
  const { criteria, setCriteria, qData } = props;
  return (
    <>
      <h3>usuario {criteria.qID}</h3>
      {criteria.qIndex === 0 ? (
        <U1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 1 ? (
        <U2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 2 ? (
        <U3 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 3 ? (
        <U4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 4 ? (
        <U5 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 5 ? (
        <U6 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 6 ? (
        <U7 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 7 ? (
        <U8 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 8 ? (
        <U9 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 9 ? (
        <U10 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 10 ? (
        <U11 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 11 ? (
        <U12 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 12 ? (
        <U13 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 13 ? (
        <U14 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 14 ? (
        <U15 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 15 ? (
        <U16 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 16 ? (
        <U17 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : criteria.qIndex === 17 ? (
        <U18 criteria={criteria} setCriteria={setCriteria} qData={qData} />
      ) : (
        <h2>Error: No se encontro pregunta</h2>
      )}
    </>
  );
}
