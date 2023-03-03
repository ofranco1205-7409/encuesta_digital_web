import React, { useState } from "react";
import { Form, Radio, Checkbox, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U10.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U10(props) {
  const { criteria, setCriteria, qData } = props;

  const { folio, sID, qID } = criteria;

  const [button, setButton] = useState(null);

  console.log(qData);

  const formik = useFormik({
    initialValues: initialValues(qData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = {
          folio: folio,
          qID: qData.qID,
          qRes: formValue.qRes,
        };
        console.log(newData);
        if (qData.qRes || qData.qRes === "") {
          console.log("Update question");
          await tacController.updateQuestion(newData);
        } else {
          console.log("Insert question");
          await tacController.createQuestion(newData);
        }

        tn.updateQuestion(button, setCriteria);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="u10">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U10.- Planificación del despacho de la flota
          </Header.Content>
          <Header.Subheader>
            Escoja la opción que mejor represente lo que hace habitualmente
          </Header.Subheader>
        </Header>
        {formik.errors.qRes ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="No se realiza planificación previa"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes1
            onChange={formik.handleChange}
            value="U10_1"
            checked={formik.values.qRes === "U10_1"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="Se espera a completar la capacidad del vehículo"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U10_2"
            checked={formik.values.qRes === "U10_2"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="Se planifican rutas y tiempos"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="U10_3"
            checked={formik.values.qRes === "U10_3"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="La planificación está terciarizada"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="U10_4"
            checked={formik.values.qRes === "U10_4"}
            //error={formik.errors.qRes}
          />
        </Form.Group>
        <NavigationButtons
          setButton={setButton}
          formik={formik}
          progress={tn.getProgress(criteria)}
        />
      </Form>
    </div>
  );
}
