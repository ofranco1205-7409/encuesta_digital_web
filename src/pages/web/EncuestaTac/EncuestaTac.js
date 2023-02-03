import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { Tac } from "../../../api";
import {
  Loader,
  Step,
  Container,
  Segment,
  Icon,
  Header,
} from "semantic-ui-react";
import { Survey } from "../../../components/Web/Tac/Survey";
import { useFolio } from "../../../hooks";
import { TacNavigation } from "../../../components/Web/Tac/TacNavigation";
import "./EncuestaTac.scss";

const tacController = new Tac();
const tn = new TacNavigation();

export function EncuestaTac() {
  const { folio } = useFolio();

  const [qData, setqData] = useState(null);

  const sID_inicial = 0;
  const qIndex_inicial = 0;
  const qID_inicial = tn.qID({ sID: sID_inicial, qIndex: qIndex_inicial });
  const [criteria, setCriteria] = useState({
    folio: folio._id,
    sID: sID_inicial,
    qIndex: qIndex_inicial,
    qID: qID_inicial,
  });

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
        <div className="encuestaTac">
          <Segment color="blue" size="massive" textAlign="left">
            <Header as="h2" dividing>
              <Icon name="payment" size="big" />
              <Header.Content>
                <span className="encuestaTac__header">Identificación </span>
              </Header.Content>
              <Header.Subheader>
                Manage your account settings and set e-mail preferences.
              </Header.Subheader>
            </Header>
          </Segment>
          <Segment color="black" secondary className="encuestaTac__tac">
            <div className="encuestaTac__tac__left">
              <Step.Group
                vertical={true}
                stackable="tablet"
                items={steps}
                size="mini"
              />
            </div>
            <div className="encuestaTac__tac__right">
              <Survey
                criteria={criteria}
                setCriteria={setCriteria}
                qData={qData}
                //setqData={setqData}
              />
            </div>
          </Segment>
        </div>
      </Container>
    </>
  );
}
