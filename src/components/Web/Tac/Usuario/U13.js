import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U13.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U13(props) {
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
          qRes: formValue.U13,
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
    <div className="u13">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U13.- Tecnología actualmente implementada en sus operaciones
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="Código de barras/RFID"
            control="input"
            type="checkbox"
            name="U13"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U13_1"
            checked={formik.values.U13.includes("U13_1")}
            error={formik.errors.U13}
          />
          <Form.Field
            label="Intercambio electrónico de datos (EDI)"
            control="input"
            type="checkbox"
            name="U13"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U13_2"
            checked={formik.values.U13.includes("U13_2")}
            error={formik.errors.U13}
          />
          <Form.Field
            label="Radiofrecuencia"
            control="input"
            type="checkbox"
            name="U13"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U13_3"
            checked={formik.values.U13.includes("U13_3")}
            error={formik.errors.U13}
          />
          <Form.Field
            label="Sistema de Gestión Integrada (ERP)"
            control="input"
            type="checkbox"
            name="U13"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U13_4"
            checked={formik.values.U13.includes("U13_4")}
            error={formik.errors.U13}
          />
          <Form.Field
            label="Sistema de Manejo de Almacenes (WMS)"
            control="input"
            type="checkbox"
            name="U13"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U13_5"
            checked={formik.values.U13.includes("U13_5")}
            error={formik.errors.U13}
          />

          <Form.Field
            label="Sistema de Manejo de Transporte/Flota (TMS)"
            control="input"
            type="checkbox"
            name="U13"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U13_6"
            checked={formik.values.U13.includes("U13_6")}
            error={formik.errors.U13}
          />

          <Form.Field
            label="Otros"
            control="input"
            type="checkbox"
            name="U13"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U13_7"
            checked={formik.values.U13.includes("U13_7")}
            error={formik.errors.U13}
          />

          <Form.Field
            label="Niguno"
            control="input"
            type="checkbox"
            name="U13"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U13_8"
            checked={formik.values.U13.includes("U13_8")}
            error={formik.errors.U13}
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
