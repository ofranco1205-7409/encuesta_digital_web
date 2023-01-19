import React, { useState, useEffect } from "react";
import { size, map } from "lodash";
import { Tac } from "../../../api";
import { Loader, Step, Container } from "semantic-ui-react";
import { Survey } from "../../../components/Web/Tac/Survey";
import { useFolio } from "../../../hooks";
import { Test } from ".";
import "./EncuestaTac.scss";

const tacController = new Tac();

export function EncuestaTac() {
  const { folio } = useFolio();

  console.log("EncuestaTac folio", folio);

  const [qData, setqData] = useState(null);

  const [criteria, setCriteria] = useState({
    folio: folio._id,
    sID: 1,
    qIndex: 0,
    sComplete: [true, false, false, false],
    survey: [
      {
        id: 0,
        key: "Introduccion",
        completed: false,
        active: false,
        icon: "truck",
        title: "Introduccion",
        description: "Choose your shipping options",
        questions: ["A1", "A2"],
      },
      {
        id: 1,
        key: "Identificacion",
        completed: false,
        active: false,
        icon: "payment",
        title: "Identificacion",
        description: "Enter billing information",
        questions: ["B1", "B2", "B3", "B4"],
      },
      {
        id: 2,
        key: "Operador",
        completed: false,
        active: false,
        icon: "truck",
        title: "Operador",
        description: "Enter billing information",
        questions: ["C1", "C2"],
      },
      {
        id: 3,
        key: "Usuario",
        completed: false,
        active: false,
        icon: "user",
        title: "Usuario",
        description: "Enter billing information",
        questions: ["D1", "D2"],
      },
    ],
    qID: (survey, sID, qIndex) => {
      return survey[sID].questions[qIndex];
    },
  });

  const updateSteps = (criteria) => {
    return map(criteria.survey, (seccion) => {
      seccion.active = seccion.id === criteria.sID;
      seccion.completed = criteria.sComplete[seccion.id];
      return seccion;
    });
  };

  var steps = updateSteps(criteria);

  const questions = [
    {
      key: "B1",
      completed: true,
      active: false,
      icon: "truck",
      title: "B1",
      description: "",
    },
    {
      key: "B2",
      completed: false,
      active: true,
      icon: "payment",
      title: "B2",
      description: "",
    },
    {
      key: "B3",
      completed: false,
      active: true,
      icon: "payment",
      title: "B3",
      description: "",
    },
    {
      key: "B4",
      completed: false,
      active: true,
      icon: "payment",
      title: "B4",
      description: "",
    },
    {
      key: "B5",
      completed: false,
      active: true,
      icon: "payment",
      title: "B5",
      description: "",
    },
    {
      key: "B6",
      completed: false,
      active: true,
      icon: "payment",
      title: "B6",
      description: "",
    },
    {
      key: "B7",
      completed: false,
      active: true,
      icon: "payment",
      title: "B7",
      description: "",
    },
    {
      key: "B8",
      completed: false,
      active: true,
      icon: "payment",
      title: "B8",
      description: "",
    },
    {
      key: "B1",
      completed: true,
      active: false,
      icon: "truck",
      title: "B1",
      description: "",
    },
    {
      key: "B2",
      completed: false,
      active: true,
      icon: "payment",
      title: "B2",
      description: "",
    },
    {
      key: "B3",
      completed: false,
      active: true,
      icon: "payment",
      title: "B3",
      description: "",
    },
    {
      key: "B4",
      completed: false,
      active: true,
      icon: "payment",
      title: "B4",
      description: "",
    },
    {
      key: "B5",
      completed: false,
      active: true,
      icon: "payment",
      title: "B5",
      description: "",
    },
    {
      key: "B6",
      completed: false,
      active: true,
      icon: "payment",
      title: "B6",
      description: "",
    },
    {
      key: "B7",
      completed: false,
      active: true,
      icon: "payment",
      title: "B7",
      description: "",
    },
    {
      key: "B8",
      completed: false,
      active: true,
      icon: "payment",
      title: "B8",
      description: "",
    },
  ];

  const steps_tmp = [
    {
      key: "Introduccion",
      completed: true,
      icon: "truck",
      title: "Introduccion",
      description: "Choose your shipping options",
    },
    {
      key: "Identificacion",
      active: true,
      icon: "payment",
      title: "Identificacion",
      description: "Enter billing information",
    },
    {
      key: "Operador",
      icon: "truck",
      title: "Operador",
      description: "Enter billing information",
    },
    {
      key: "Usuario",
      icon: "user",
      title: "Usuario",
      description: "Enter billing information",
    },
    {
      key: "confirm",
      disabled: true,
      icon: "info",
      title: "Envir Informacion",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        setqData(null);

        const response = await tacController.getQuestions(criteria);

        if (response[0]) {
          setqData(response[0]);
        } else {
          //folio, qID
          const { folio, qID, survey, sID, qIndex } = criteria;
          setqData({ folio, qID: qID(survey, sID, qIndex), qRes: "" });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [criteria]);

  if (!qData) return <Loader active inline="centered" />;
  if (size(qData) === 0) return "No hay ninguna pregunta en DB";

  return (
    <Container>
      <div className="tac">
        <div className="tac__left">
          <Step.Group vertical items={steps} size="mini" />
        </div>
        <div className="tac__right">
          <Survey
            criteria={criteria}
            setCriteria={setCriteria}
            qData={qData}
            setqData={setqData}
          />
        </div>
      </div>
    </Container>
  );
}
