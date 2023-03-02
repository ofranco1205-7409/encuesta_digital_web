import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C7_2.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C7_2(props) {
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
          qRes: formValue.C7_2,
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
    <div className="c7_2">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C7.2.- Tecnología actualmente implementada en sus operaciones
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        {formik.errors.C7_2 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="Código de barras/RFID"
            control="input"
            type="checkbox"
            name="C7_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.2_1"
            checked={formik.values.C7_2.includes("C7.2_1")}
            //error={formik.errors.C7_2}
          />
          <Form.Field
            label="Intercambio electrónico de datos (EDI)"
            control="input"
            type="checkbox"
            name="C7_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.2_2"
            checked={formik.values.C7_2.includes("C7.2_2")}
            //error={formik.errors.C7_2}
          />
          <Form.Field
            label="Radiofrecuencia"
            control="input"
            type="checkbox"
            name="C7_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.2_3"
            checked={formik.values.C7_2.includes("C7.2_3")}
            //error={formik.errors.C7_2}
          />
          <Form.Field
            label="Sistema de Gestión Integrada (ERP)"
            control="input"
            type="checkbox"
            name="C7_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.2_4"
            checked={formik.values.C7_2.includes("C7.2_4")}
            //error={formik.errors.C7_2}
          />
          <Form.Field
            label="Sistema de Manejo de Almacenes (WMS)"
            control="input"
            type="checkbox"
            name="C7_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.2_5"
            checked={formik.values.C7_2.includes("C7.2_5")}
            //error={formik.errors.C7_2}
          />

          <Form.Field
            label="Sistema de Manejo de Transporte/Flota (TMS)"
            control="input"
            type="checkbox"
            name="C7_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.2_6"
            checked={formik.values.C7_2.includes("C7.2_6")}
            //error={formik.errors.C7_2}
          />

          <Form.Field
            label="Otros"
            control="input"
            type="checkbox"
            name="C7_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.2_7"
            checked={formik.values.C7_2.includes("C7.2_7")}
            //error={formik.errors.C7_2}
          />

          <Form.Field
            label="Niguno"
            control="input"
            type="checkbox"
            name="C7_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.2_8"
            checked={formik.values.C7_2.includes("C7.2_8")}
            //error={formik.errors.C7_2}
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
