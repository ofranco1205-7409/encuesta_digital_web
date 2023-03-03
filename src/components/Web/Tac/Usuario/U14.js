import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U14.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U14(props) {
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
          qRes: formValue.U14,
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
    <div className="u14">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U14.- ¿Ha implementado algún tipo de proceso de innovación en
            logística?
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        {formik.errors.U14 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="Eficiencia en la cadena logística"
            control="input"
            type="checkbox"
            name="U14"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U14_1"
            checked={formik.values.U14.includes("U14_1")}
            //error={formik.errors.U14}
          />
          <Form.Field
            label="Proyectos de sostenibilidad ambiental"
            control="input"
            type="checkbox"
            name="U14"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U14_2"
            checked={formik.values.U14.includes("U14_2")}
            //error={formik.errors.U14}
          />
          <Form.Field
            label="Reducción de riesgos en la cadena de suministro"
            control="input"
            type="checkbox"
            name="U14"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U14_3"
            checked={formik.values.U14.includes("U14_3")}
            //error={formik.errors.U14}
          />
          <Form.Field
            label="Desarrollo de prácticas colaborativas"
            control="input"
            type="checkbox"
            name="U14"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U14_4"
            checked={formik.values.U14.includes("U14_4")}
            //error={formik.errors.U14}
          />
          <Form.Field
            label="Adopción de nuevas tecnologías/digitalización de procesos"
            control="input"
            type="checkbox"
            name="U14"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U14_5"
            checked={formik.values.U14.includes("U14_5")}
            //error={formik.errors.U14}
          />
          <Form.Field
            label="Otras"
            control="input"
            type="checkbox"
            name="U14"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U14_6"
            checked={formik.values.U14.includes("U14_6")}
            //error={formik.errors.U14}
          />
          <Form.Field
            label="Ninguno"
            control="input"
            type="checkbox"
            name="U14"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U14_7"
            checked={formik.values.U14.includes("U14_7")}
            //error={formik.errors.U14}
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
