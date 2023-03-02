import React, { useState } from "react";
import { Form, Radio, Checkbox, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./B7.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function B7(props) {
  const { criteria, setCriteria, qData } = props;

  const { folio, sID, qID } = criteria;

  const [button, setButton] = useState(null);

  console.log(qData);

  const formik = useFormik({
    initialValues: initialValues(qData.qRes),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formValue", formValue);
      try {
        const newData = {
          folio: folio,
          qID: qData.qID,
          qRes: {
            pais: formValue.pais,
            estado: formValue.estado,
            ciudad: formValue.ciudad,
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

  return (
    <div className="tac-form">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            B7.- Localización / sede de la actividad
          </Header.Content>
          <Header.Subheader>Complete la información.</Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="*País"
            control="input"
            type="text"
            name="pais"
            //id="qRes1
            /*
            onChange={(_, data) => {
              console.log(data.value);
              formik.setFieldValue("Res1", data.value);
            }}*/
            placeholder="Pais [requerido]"
            onChange={formik.handleChange}
            value={formik.values.pais}
            //checked={formik.values.qRes === "0_5"}
            error={formik.errors.pais}
          />
          <Form.Field
            label="Estado"
            control="input"
            type="text"
            name="estado"
            //id="qRes2"
            placeholder="Estado"
            onChange={formik.handleChange}
            value={formik.values.estado}
            //checked={formik.values.qRes === "6_10"}
            error={formik.errors.estado}
          />
          <Form.Field
            label="Ciudad"
            control="input"
            type="text"
            name="ciudad"
            //id="qRes4"
            placeholder="Ciudad"
            onChange={formik.handleChange}
            value={formik.values.ciudad}
            //checked={formik.values.qRes === "> 16"}
            error={formik.errors.ciudad}
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
