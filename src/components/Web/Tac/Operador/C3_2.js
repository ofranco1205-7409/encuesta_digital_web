import React, { useState } from "react";
import { Form, Radio, Checkbox, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C3_2.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C3_2(props) {
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
    <div className="c3_2">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C3.2.- ¿Considera que existen barreras a la participación de las
            mujeres en el sector Transporte Automotor de Carga?
          </Header.Content>
          <Header.Subheader>Seleccione una opcion.</Header.Subheader>
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
            label="Sí, existen barreras y situaciones de no aceptación"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes1
            onChange={formik.handleChange}
            value="C3.2_1"
            checked={formik.values.qRes === "C3.2_1"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="No existen barreras, aunque las mujeres no deberían ser conductoras"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C3.2_2"
            checked={formik.values.qRes === "C3.2_2"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="No existe ningún tipo de barreras"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C3.2_3"
            checked={formik.values.qRes === "C3.2_3"}
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
