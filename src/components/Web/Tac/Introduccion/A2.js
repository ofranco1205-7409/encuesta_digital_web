import { useState } from "react";
import {
  Button,
  Form,
  Tab,
  Progress,
  Divider,
  Header,
} from "semantic-ui-react";
import { useFormik, Field } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./A2.form";
import { NavigationButtons } from "../NavigationButtons";
import { BasicModal } from "../../../Shared";
import { RetoForm } from "./RetoForm";
import { ListReto } from "./ListReto";
import { TacNavigation } from "../../../../components/Web/Tac/TacNavigation";
import "./A2.scss";

const tacController = new Tac();
const tn = new TacNavigation();

export function A2(props) {
  const [retos, setRetos] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevStata) => !prevStata);

  const { criteria, setCriteria, qData } = props;
  const { folio, sID } = criteria;
  const [button, setButton] = useState(null);

  console.log("qData", qData);

  const formik = useFormik({
    initialValues: initialValues(retos),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formValue", formValue);
      try {
        const newData = {
          folio: folio,
          qID: qData.qID,
          qRes: retos,
        };
        console.log("newData", newData);
        //if (qData.qRes) {
        //  console.log("Update question");
        await tacController.updateQuestion(newData);
        //} else {
        //  console.log("Insert question");
        //  await tacController.createQuestion(newData);
        //}

        tn.updateQuestion(button, setCriteria);

        /*
        if (button === "anterior") {
          console.log("Button 1 clicked!");
          //previous(criteria.qIndex - 1);
        } else if (button === "siguiente") {
          console.log("Button 2 clicked!");
          //next(criteria.qIndex + 1);
        }*/
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <div className="a2">
        <Header as="h3" dividing>
          <Header.Content>
            A2.- Considera que existen retos adicionales que no han sido
            incluidos en la lista anterior
          </Header.Content>
          <Header.Subheader>
            Por favor agregelos y ordenelos arrastrando a su posici??n en la
            lista
          </Header.Subheader>
        </Header>
        <div className="a2__retos">
          <Button className="a2__retos__add" primary onClick={onOpenCloseModal}>
            Agregar reto
          </Button>
        </div>
        <p />
        <ListReto
          reload={reload}
          onReload={onReload}
          qData={qData}
          retos={retos}
          setRetos={setRetos}
        />
        <p />
        <Divider />
        <Form onSubmit={formik.handleSubmit}>
          <NavigationButtons
            setButton={setButton}
            formik={formik}
            progress={tn.getProgress(criteria)}
          />
        </Form>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Reto">
        <RetoForm
          onClose={onOpenCloseModal}
          onReload={onReload}
          qData={qData}
        />
      </BasicModal>
    </>
  );
}
