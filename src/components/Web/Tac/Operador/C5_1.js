import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C5_1.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C5_1(props) {
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
            C5_1: formValue.C5_1,
            otro: formValue.C5_1.includes("C5.1_5") ? formValue.otro : "",
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
    <div className="c5_1">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C5.1.- ¿A qué tipo de cursos formativos tiene acceso?
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        {formik.errors.C5_1 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="Seguridad Vial"
            control="input"
            type="checkbox"
            name="C5_1"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C5.1_1"
            checked={formik.values.C5_1.includes("C5.1_1")}
            //error={formik.errors.C5_1}
          />
          <Form.Field
            label="Requerimientos para operar"
            control="input"
            type="checkbox"
            name="C5_1"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C5.1_2"
            checked={formik.values.C5_1.includes("C5.1_2")}
            //error={formik.errors.C5_1}
          />
          <Form.Field
            label="Obligaciones tributarias"
            control="input"
            type="checkbox"
            name="C5_1"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C5.1_3"
            checked={formik.values.C5_1.includes("C5.1_3")}
            //error={formik.errors.C5_1}
          />
          <Form.Field
            label="Gestión empresarial y contabilidad"
            control="input"
            type="checkbox"
            name="C5_1"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C5.1_4"
            checked={formik.values.C5_1.includes("C5.1_4")}
            //error={formik.errors.C5_1}
          />
          <Form.Field
            label="Otros (especifique)"
            control="input"
            type="checkbox"
            name="C5_1"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C5.1_5"
            checked={formik.values.C5_1.includes("C5.1_5")}
            //error={formik.errors.C5_1}
          />

          {formik.values.C5_1.includes("C5.1_5") ? (
            <Form.Field
              label=""
              control="input"
              type="text"
              name="otro"
              placeholder="Cursos"
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
