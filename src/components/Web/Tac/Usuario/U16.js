import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U16.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U16(props) {
  const { criteria, setCriteria, qData } = props;

  const { sID } = criteria;

  const [button, setButton] = useState(null);

  console.log("qData", qData);

  const formik = useFormik({
    initialValues: initialValues(qData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("onSubmit");
      console.log("formValue", formValue);
      try {
        const newData = {
          folio: qData.folio,
          qID: qData.qID,
          qRes: formValue.qRes,
        };
        console.log(newData);
        if (qData.qRes !== null) {
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

  console.log(formik.values);
  return (
    <div className="u16">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U16.- ¿Considera que la oferta formativa actual cubre las
            necesidades del sector?
          </Header.Content>
          <Header.Subheader>Seleccione SI/NO</Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="Si"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes1
            onChange={formik.handleChange}
            value="U16_1"
            checked={formik.values.qRes === "U16_1"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="No"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U16_2"
            checked={formik.values.qRes === "U16_2"}
            error={formik.errors.qRes}
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
