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
        ) : criteria.sID === 2 ? (
          <Operador
            criteria={criteria}
            setCriteria={setCriteria}
            qData={qData}
          />
        ) : criteria.sID === 3 ? (
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
