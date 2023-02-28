import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U15.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U15(props) {
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
          qRes: formValue.U15,
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
    <div className="u15">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U15.- Necesidad de especialistas en el sector logístico / TAC
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="Especialistas en Cadena de Suministro"
            control="input"
            type="checkbox"
            name="U15"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U15_1"
            checked={formik.values.U15.includes("U15_1")}
            error={formik.errors.U15}
          />
          <Form.Field
            label="Especialistas en Comercio Exterior"
            control="input"
            type="checkbox"
            name="U15"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U15_2"
            checked={formik.values.U15.includes("U15_2")}
            error={formik.errors.U15}
          />
          <Form.Field
            label="Especialistas en Gestión de Inventarios"
            control="input"
            type="checkbox"
            name="U15"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U15_3"
            checked={formik.values.U15.includes("U15_3")}
            error={formik.errors.U15}
          />
          <Form.Field
            label="Especialistas en e-Commerce"
            control="input"
            type="checkbox"
            name="U15"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U15_4"
            checked={formik.values.U15.includes("U15_4")}
            error={formik.errors.U15}
          />
          <Form.Field
            label="Especialistas en Transporte"
            control="input"
            type="checkbox"
            name="U15"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U15_5"
            checked={formik.values.U15.includes("U15_5")}
            error={formik.errors.U15}
          />
          <Form.Field
            label="Controlador de Tráfico"
            control="input"
            type="checkbox"
            name="U15"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U15_6"
            checked={formik.values.U15.includes("U15_6")}
            error={formik.errors.U15}
          />
          <Form.Field
            label="Especialistas en Lean Management"
            control="input"
            type="checkbox"
            name="U15"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U15_7"
            checked={formik.values.U15.includes("U15_7")}
            error={formik.errors.U15}
          />
          <Form.Field
            label="Especialistas en Compras"
            control="input"
            type="checkbox"
            name="U15"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U15_8"
            checked={formik.values.U15.includes("U15_8")}
            error={formik.errors.U15}
          />
          <Form.Field
            label="Otros"
            control="input"
            type="checkbox"
            name="U15"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U15_9"
            checked={formik.values.U15.includes("U15_9")}
            error={formik.errors.U15}
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