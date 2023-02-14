import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./B3.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../../../../components/Web/Tac/TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function B3(props) {
  const { criteria, setCriteria, qData } = props;

  const { sID } = criteria;

  const [button, setButton] = useState(null);

  console.log(qData);

  const formik = useFormik({
    initialValues: initialValues(qData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("onSubmit");
      console.log(formValue);
      try {
        const newData = {
          folio: qData.folio,
          qID: qData.qID,
          qRes: formValue.B3,
        };
        console.log(newData);
        if (qData.qRes) {
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
    <div className="tac-form">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>B3.- Rango de ventas anuales</Header.Content>
          <Header.Subheader>Seleccione una opcion.</Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="$0-$1,000"
            control="input"
            type="checkbox"
            name="B3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="$0-$1,000"
            checked={formik.values.B3.includes("$0-$1,000")}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="$1,001-$10,000"
            control="input"
            type="checkbox"
            name="B3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="$1,001-$10,000"
            checked={formik.values.B3.includes("$1,001-$10,000")}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="$10,001-$100,000"
            control="input"
            type="checkbox"
            name="B3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="$10,001-$100,000"
            checked={formik.values.B3.includes("$10,001-$100,000")}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="$100,001-$1,000,0000"
            control="input"
            type="checkbox"
            name="B3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="$100,001-$1,000,0000"
            checked={formik.values.B3.includes("$100,001-$1,000,0000")}
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
