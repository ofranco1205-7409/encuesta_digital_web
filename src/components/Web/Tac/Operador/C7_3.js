import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C7_3.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C7_3(props) {
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
          qRes: formValue.C7_3,
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
    <div className="c7_3">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C7.3.- ¿Cuáles considera que son los principales frenos para la
            digitalización?
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        {formik.errors.C7_3 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="Desconocimiento de las tecnologías aplicables"
            control="input"
            type="checkbox"
            name="C7_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.3_1"
            checked={formik.values.C7_3.includes("C7.3_1")}
            //error={formik.errors.C7_3}
          />
          <Form.Field
            label="Falta de financiación"
            control="input"
            type="checkbox"
            name="C7_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.3_2"
            checked={formik.values.C7_3.includes("C7.3_2")}
            //error={formik.errors.C7_3}
          />
          <Form.Field
            label="Falta de personal entrenado"
            control="input"
            type="checkbox"
            name="C7_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.3_3"
            checked={formik.values.C7_3.includes("C7.3_3")}
            //error={formik.errors.C7_3}
          />
          <Form.Field
            label="Otro"
            control="input"
            type="checkbox"
            name="C7_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.3_4"
            checked={formik.values.C7_3.includes("C7.3_4")}
            //error={formik.errors.C7_3}
          />
          <Form.Field
            label="Ninguno"
            control="input"
            type="checkbox"
            name="C7_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C7.3_5"
            checked={formik.values.C7_3.includes("C7.3_5")}
            //error={formik.errors.C7_3}
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
