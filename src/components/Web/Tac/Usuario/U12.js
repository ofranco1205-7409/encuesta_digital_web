import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U12.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U12(props) {
  const { criteria, setCriteria, qData } = props;

  const { sID } = criteria;

  const [button, setButton] = useState(null);

  console.log("qData", qData);

  const formik = useFormik({
    initialValues: initialValues(qData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formValue", formValue);
      try {
        const newData = {
          folio: qData.folio,
          qID: qData.qID,
          qRes: formValue.U12,
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
    <div className="u12">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U12.- ¿Con qué certificaciones cuenta actualmente?
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        {formik.errors.U12 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="OEA"
            control="input"
            type="checkbox"
            name="U12"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U12_1"
            checked={formik.values.U12.includes("U12_1")}
            //error={formik.errors.U12}
          />
          <Form.Field
            label="BASC (Business Alliance for Security)"
            control="input"
            type="checkbox"
            name="U12"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U12_2"
            checked={formik.values.U12.includes("U12_2")}
            //error={formik.errors.U12}
          />
          <Form.Field
            label="IATA"
            control="input"
            type="checkbox"
            name="U12"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U12_3"
            checked={formik.values.U12.includes("U12_3")}
            //error={formik.errors.U12}
          />
          <Form.Field
            label="C-TPAT (OEA @USA)"
            control="input"
            type="checkbox"
            name="U12"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U12_4"
            checked={formik.values.U12.includes("U12_4")}
            //error={formik.errors.U12}
          />
          <Form.Field
            label="ISO9001"
            control="input"
            type="checkbox"
            name="U12"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U12_5"
            checked={formik.values.U12.includes("U12_5")}
            //error={formik.errors.U12}
          />
          <Form.Field
            label="ISO14001 (Implementación Sistema de Gestión Ambiental)"
            control="input"
            type="checkbox"
            name="U12"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U12_6"
            checked={formik.values.U12.includes("U12_6")}
            //error={formik.errors.U12}
          />
          <Form.Field
            label="ISO28000 (Seguridad en la Cadena de Suministros)"
            control="input"
            type="checkbox"
            name="U12"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U12_7"
            checked={formik.values.U12.includes("U12_7")}
            //error={formik.errors.U12}
          />
          <Form.Field
            label="ISO45001 (Sistema Gestión Seguridad y Salud en el trabajo)"
            control="input"
            type="checkbox"
            name="U12"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U12_8"
            checked={formik.values.U12.includes("U12_8")}
            //error={formik.errors.U12}
          />
          <Form.Field
            label="Otras"
            control="input"
            type="checkbox"
            name="U12"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U12_9"
            checked={formik.values.U12.includes("U12_9")}
            //error={formik.errors.U12}
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
