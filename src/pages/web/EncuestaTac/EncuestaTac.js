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
import { useNavigate } from "react-router-dom";
import "./EncuestaTac.scss";

const tacController = new Tac();
const tn = new TacNavigation();

export function EncuestaTac() {
  const navigate = useNavigate();

  const { folio } = useFolio();

  const [qData, setqData] = useState(null);

  const [criteria, setCriteria] = useState(tn.getCriteriaIni(folio));

  /*const [criteria, setCriteria] = useState({
    folio: folio._id,
    sID: sID_inicial,
    qIndex: qIndex_inicial,
    qID: qID_inicial,
  });
  */

  var steps = tn.updateSteps(criteria);
  var currentHeader = tn.getCurrentHeader(criteria);

  useEffect(() => {
    (async () => {
      const { folio, qID } = criteria;
      try {
        console.warn("EncuestaTac criteria", criteria);

        setqData(null);

        if (qID === "END") {
          navigate("/tacEnd");
        } else {
          const response = await tacController.getQuestions(criteria);

          if (response[0]) {
            setqData(response[0]);
          } else {
            setqData({ folio, qID, qRes: null });
          }
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
              <Icon name={currentHeader.icon} />
              <Header.Content>
                <span className="encuestaTac__header">{currentHeader.key}</span>
              </Header.Content>
              <Header.Subheader>
                {currentHeader.description_large}
              </Header.Subheader>
            </Header>
          </Segment>
          <Segment color="black" secondary className="encuestaTac__tac">
            <div className="encuestaTac__tac__left">
              <Step.Group vertical={true} items={steps} size="mini" />
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
