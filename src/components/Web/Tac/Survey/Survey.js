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
      <Segment className="survey__progress" color="blue" tertiary>
        <div className="survey__progress__title">
          <Icon name="payment" size="huge" />
          <h1>&nbsp;Identificación&nbsp;</h1>
        </div>
        <Progress value="1" total="8" size="tiny" color="grey">
          1/8
        </Progress>
      </Segment>
      <Segment color="blue" size="massive" textAlign="left">
        <Icon name="payment" size="big" />
        Identificación
        <Progress value="1" total="8" size="tiny" color="grey">
          1/8
        </Progress>
      </Segment>

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
