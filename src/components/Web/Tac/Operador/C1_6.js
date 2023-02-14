import React, { useState } from "react";
import { Form, Radio, Checkbox, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C1_6.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C1_6(props) {
  const { criteria, setCriteria, qData } = props;

  const { folio, sID, qID } = criteria;

  const [button, setButton] = useState(null);

  console.log(qData);

  const formik = useFormik({
    initialValues: initialValues(qData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = {
          folio: folio,
          qID: qData.qID,
          qRes: formValue.qRes,
        };
        console.log(newData);
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
    <div className="c1_6">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C1.6.- ¿Se cobra el tiempo de espera en carga/descarga?
          </Header.Content>
          <Header.Subheader>Seleccione una opcion.</Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="No se cobra"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes1
            /*
            onChange={(_, data) => {
              console.log(data.value);
              formik.setFieldValue("Res1", data.value);
            }}*/
            onChange={formik.handleChange}
            value="C1.6_1"
            checked={formik.values.qRes === "C1.6_1"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="Cantidad de horas exentas de cobro"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C1.6_2"
            checked={formik.values.qRes === "C1.6_2"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="Tarifa aplicada por hora de espera"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C1.6_3"
            checked={formik.values.qRes === "C1.6_3"}
            error={formik.errors.qRes}
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
