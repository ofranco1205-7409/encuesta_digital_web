import React, { useState } from "react";
import { Form, Radio, Checkbox, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U4.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U4(props) {
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
    <div className="u4">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U4.- ¿Cómo calcula su costo logístico?
          </Header.Content>
          <Header.Subheader>
            Escoja la opción que mejor represente lo que hace habitualmente
          </Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="Como valor absoluto/total"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes1
            onChange={formik.handleChange}
            value="U4_1"
            checked={formik.values.qRes === "U4_1"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="Como porcentaje sobre las ventas"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U4_2"
            checked={formik.values.qRes === "U4_2"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="En base a actividades (ABC)"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="U4_3"
            checked={formik.values.qRes === "U4_3"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="Por unidad de medida"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="U4_4"
            checked={formik.values.qRes === "U4_4"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="No lo calcula/Desconoce la información"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="U4_5"
            checked={formik.values.qRes === "U4_5"}
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
