import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C7_1.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C7_1(props) {
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
          qRes: {
            C7_1: formValue.C7_1,
            otro: formValue.C7_1.includes("C7.1_4") ? formValue.otro : "",
          },
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
    <div className="c7_1">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C7.1.- ¿En qué considera que podría ayudarle la digitalización de su
            negocio?
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="A tener una operativa más eficiente"
            control="input"
            type="checkbox"
            name="C7_1"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.1_1"
            checked={formik.values.C7_1.includes("C7.1_1")}
            error={formik.errors.C7_1}
          />
          <Form.Field
            label="A reducir costos"
            control="input"
            type="checkbox"
            name="C7_1"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.1_2"
            checked={formik.values.C7_1.includes("C7.1_2")}
            error={formik.errors.C7_1}
          />
          <Form.Field
            label="A reducir los riesgos de seguridad"
            control="input"
            type="checkbox"
            name="C7_1"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.1_3"
            checked={formik.values.C7_1.includes("C7.1_3")}
            error={formik.errors.C7_1}
          />
          <Form.Field
            label="Otros (especifique)"
            control="input"
            type="checkbox"
            name="C7_1"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.1_4"
            checked={formik.values.C7_1.includes("C7.1_4")}
            error={formik.errors.C7_1}
          />

          {formik.values.C7_1.includes("C7.1_4") ? (
            <Form.Field
              label=""
              control="input"
              type="text"
              name="otro"
              placeholder=""
              //id="qRes2"
              onChange={formik.handleChange}
              value={formik.values.otro}
              error={formik.errors.otro}
            />
          ) : (
            <p></p>
          )}
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
