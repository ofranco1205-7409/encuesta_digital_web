import React from "react";
import { Progress, Segment, Icon, Message } from "semantic-ui-react";
import { Introduccion } from "../Introduccion";
import { Identificacion } from "../Identificacion";
import { Operador } from "../Operador";
import { Usuario } from "../Usuario";
import "./Survey.scss";

export function Survey(props) {
  const { criteria, setCriteria, qData } = props;

  return (
    <div className="survey">
      <Segment className="survey__form">
        {criteria.sID === 0 ? (
          <Introduccion
            criteria={criteria}
            setCriteria={setCriteria}
            qData={qData}
          />
        ) : criteria.sID === 1 ? (
          <Identificacion
            criteria={criteria}
            setCriteria={setCriteria}
            qData={qData}
          />
        ) : criteria.sID === 2 && criteria.qID.substring(0, 1) !== "U" ? (
          <Operador
            criteria={criteria}
            setCriteria={setCriteria}
            qData={qData}
          />
        ) : criteria.sID === 2 ? (
          <Usuario
            criteria={criteria}
            setCriteria={setCriteria}
            qData={qData}
          />
        ) : (
          <h2>Otro</h2>
        )}
      </Segment>
    </div>
  );
}
