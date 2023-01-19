import React from "react";
import { Progress, Segment, Icon, Message } from "semantic-ui-react";
import { A1 } from "../Introduccion";
import { B1, B2, B3, B4 } from "../Identificacion";
import "./Survey.scss";

export function Survey(props) {
  const { criteria, setCriteria, qData } = props;

  return (
    <div className="survey">
      <Segment className="survey__progress" color="blue" tertiary>
        <div className="survey__progress__title">
          <Icon name="payment" size="huge" />
          <h1>
            <spam className="survey__progress__title__blue">
              &nbsp;Identificación&nbsp;
            </spam>
          </h1>
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
        {criteria.qIndex === 0 ? (
          <B1 criteria={criteria} setCriteria={setCriteria} qData={qData} />
        ) : criteria.qIndex === 1 ? (
          <B2 criteria={criteria} setCriteria={setCriteria} qData={qData} />
        ) : criteria.qIndex === 2 ? (
          <B3 criteria={criteria} setCriteria={setCriteria} qData={qData} />
        ) : (
          <B4 criteria={criteria} setCriteria={setCriteria} qData={qData} />
        )}
      </Segment>
    </div>
  );
}
