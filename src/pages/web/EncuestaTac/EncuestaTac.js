import React, { useState, useEffect } from "react";
import { size, map } from "lodash";
import { Tac } from "../../../api";
import { Loader, Step, Container, Grid, Image } from "semantic-ui-react";
import { Survey } from "../../../components/Web/Tac/Survey";
import { useFolio } from "../../../hooks";
import { TacNavigation } from "../../../components/Web/Tac/TacNavigation";
import { Test } from ".";
import "./EncuestaTac.scss";

const tacController = new Tac();
const tn = new TacNavigation();

export function EncuestaTac() {
  const { folio } = useFolio();

  const [qData, setqData] = useState(null);

  const sID_inicial = 2;
  const qIndex_inicial = 3;
  const qID_inicial = tn.qID({ sID: sID_inicial, qIndex: qIndex_inicial });
  const [criteria, setCriteria] = useState({
    folio: folio._id,
    sID: sID_inicial,
    qIndex: qIndex_inicial,
    qID: qID_inicial,
  });

  /*
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
        id: 0,
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
        questions: ["C1_1", "C1_2", "C1_3", "C1_4", "C1_5"],
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
  */

  var steps = tn.updateSteps(criteria);

  useEffect(() => {
    (async () => {
      const { folio, qID } = criteria;
      try {
        setqData(null);

        console.log("criteria", criteria);
        const response = await tacController.getQuestions(criteria);

        if (response[0]) {
          setqData(response[0]);
        } else {
          setqData({ folio, qID, qRes: null });
        }

        console.log("qData", qData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [criteria]);

  if (!qData) return <Loader active inline="centered" />;
  if (size(qData) === 0) return "No hay registros en DB";

  return (
    <>
      <Container>
        <div className="tac">
          <div className="tac__left">
            <Step.Group
              vertical={true}
              stackable="tablet"
              items={steps}
              size="mini"
            />
          </div>
          <div className="tac__right">
            <Survey
              criteria={criteria}
              setCriteria={setCriteria}
              qData={qData}
              //setqData={setqData}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
