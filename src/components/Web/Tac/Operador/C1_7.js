import React, { useEffect, useState } from "react";
import { Form, Radio, Checkbox, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C1_7.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C1_7(props) {
  const { criteria, setCriteria, qData } = props;

  const { folio, sID, qID } = criteria;

  const [button, setButton] = useState(null);

  console.log(qData);

  const formik = useFormik({
    initialValues: initialValues(qData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formValue", formValue);
      try {
        const newData = {
          folio: folio,
          qID: qData.qID,
          qRes: {
            organizacion: formValue.organizacion,
            otra_organizacion:
              formValue.organizacion === "C1.7_4"
                ? formValue.otra_organizacion
                : "",
          },
        };
        console.log("newData", newData);
        if (qData.qRes || qData.qRes === "") {
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

  return (
    <div className="tac-form">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C1.7.- ¿Bajo que tipo de organización opera?
          </Header.Content>
          <Header.Subheader>Seleccione una opcion.</Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="Estructura empresarial "
            control="input"
            type="radio"
            name="organizacion"
            //id="qRes1
            onChange={formik.handleChange}
            value="C1.7_1"
            checked={formik.values.organizacion === "C1.7_1"}
            error={formik.errors.organizacion}
          />
          <Form.Field
            label="Organización sindical"
            control="input"
            type="radio"
            name="organizacion"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C1.7_2"
            checked={formik.values.organizacion === "C1.7_2"}
            error={formik.errors.organizacion}
          />
          <Form.Field
            label="Asociación a empresa transportista formal"
            control="input"
            type="radio"
            name="organizacion"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C1.7_3"
            checked={formik.values.organizacion === "C1.7_3"}
            error={formik.errors.organizacion}
          />
          <Form.Field
            label="Otro (especifique)"
            control="input"
            type="radio"
            name="organizacion"
            //id="qRes4"
            onChange={formik.handleChange}
            value="C1.7_4"
            checked={formik.values.organizacion === "C1.7_4"}
            error={formik.errors.organizacion}
          />
          {formik.values.organizacion === "C1.7_4" ? (
            <Form.Field
              label=""
              control="input"
              type="text"
              name="otra_organizacion"
              placeholder="Tipo de organización"
              //id="qRes2"
              onChange={formik.handleChange}
              value={formik.values.otra_organizacion}
              error={formik.errors.otra_organizacion}
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
