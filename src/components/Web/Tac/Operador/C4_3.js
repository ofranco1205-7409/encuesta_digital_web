import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C4_3.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C4_3(props) {
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
          qRes: formValue.C4_3,
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
    <div className="c4_3">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C4.3.-¿Cómo financia su operativa/servicios?
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="Línea de crédito bancaria"
            control="input"
            type="checkbox"
            name="C4_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C4_3_1"
            checked={formik.values.C4_3.includes("C4_3_1")}
            error={formik.errors.C4_3}
          />
          <Form.Field
            label="Venta anticipada de facturas (facturing)"
            control="input"
            type="checkbox"
            name="C4_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C4_3_2"
            checked={formik.values.C4_3.includes("C4_3_2")}
            error={formik.errors.C4_3}
          />
          <Form.Field
            label="Compensación con otros negocios"
            control="input"
            type="checkbox"
            name="C4_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C4_3_3"
            checked={formik.values.C4_3.includes("C4_3_3")}
            error={formik.errors.C4_3}
          />
          <Form.Field
            label="Otro"
            control="input"
            type="checkbox"
            name="C4_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C4_3_4"
            checked={formik.values.C4_3.includes("C4_3_4")}
            error={formik.errors.C4_3}
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
