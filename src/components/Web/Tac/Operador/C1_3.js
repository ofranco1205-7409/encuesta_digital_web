import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C1_3.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C1_3(props) {
  const { criteria, setCriteria, qData } = props;

  const { sID } = criteria;

  const [button, setButton] = useState(null);

  console.log("C1_3 qdata", qData);

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
          qRes: {
            C1_3: formValue.C1_3,
            otro: formValue.C1_3.includes("C1.3_5") ? formValue.otro : "",
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
    <div className="tac-form">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C1_3.- Recepción/confirmación de órdenes/pedidos
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen
          </Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="Comunicación verbal o escrita"
            control="input"
            type="checkbox"
            name="C1_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C1.3_1"
            checked={formik.values.C1_3.includes("C1.3_1")}
            error={formik.errors.C1_3}
          />
          <Form.Field
            label="Por teléfono"
            control="input"
            type="checkbox"
            name="C1_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C1.3_2"
            checked={formik.values.C1_3.includes("C1.3_2")}
            error={formik.errors.C1_3}
          />
          <Form.Field
            label="Por email"
            control="input"
            type="checkbox"
            name="C1_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C1.3_3"
            checked={formik.values.C1_3.includes("C1.3_3")}
            error={formik.errors.C1_3}
          />
          <Form.Field
            label="EDI/conexión a sistema de gestión del cliente"
            control="input"
            type="checkbox"
            name="C1_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C1.3_4"
            checked={formik.values.C1_3.includes("C1.3_4")}
            error={formik.errors.C1_3}
          />
          <Form.Field
            label="Otro (especifique)"
            control="input"
            type="checkbox"
            name="C1_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C1.3_5"
            checked={formik.values.C1_3.includes("C1.3_5")}
            error={formik.errors.C1_3}
          />

          {formik.values.C1_3.includes("C1.3_5") ? (
            <Form.Field
              label=""
              control="input"
              type="text"
              name="otro"
              placeholder="Forma de recepción de órdenes o pedidos"
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
