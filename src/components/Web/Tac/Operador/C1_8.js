import React, { useState } from "react";
import { Form, Radio, Checkbox, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C1_8.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C1_8(props) {
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
    <div className="tac-form">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C1.8.- ¿Considera relevante que el Gobierno proporcione un modelo de
            carta de porte?
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
            label="Sí. Ya existe y la utiliza"
            control="input"
            type="radio"
            name="qRes"
            onChange={formik.handleChange}
            value="C1.8_1"
            checked={formik.values.qRes === "C1.8_1"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="Sí, y la utilizaría aunque no fuera obligatoria"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C1.8_2"
            checked={formik.values.qRes === "C1.8_2"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="Sí, pero sólo la utilizaría se fuera una obligación legal"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C1.8_3"
            checked={formik.values.qRes === "C1.8_3"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="No. Es innecesaria"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes4"
            onChange={formik.handleChange}
            value="C1.8_4"
            checked={formik.values.qRes === "C1.8_4"}
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
