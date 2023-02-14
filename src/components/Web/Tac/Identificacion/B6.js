import React, { useState } from "react";
import { Form, Radio, Checkbox, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./B6.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function B6(props) {
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
    <div className="tac-form">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>B6.- Perfil del entrevistado/a</Header.Content>
          <Header.Subheader>Seleccione una opcion.</Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="Gerente o funciones directivas"
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
            value="Gerente_o_funciones_directivas"
            checked={formik.values.qRes === "Gerente_o_funciones_directivas"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="Funciones de coordinacion/analista"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes2"
            onChange={formik.handleChange}
            value="Funciones_de_coordinacion/analista"
            checked={
              formik.values.qRes === "Funciones_de_coordinacion/analista"
            }
            error={formik.errors.qRes}
          />
          <Form.Field
            label="Funciones_operativas/técnicas"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="Funciones_operativas/tecnicas"
            checked={formik.values.qRes === "Funciones_operativas/tecnicas"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="Otras funciones"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes4"
            onChange={formik.handleChange}
            value="Otras_funciones"
            checked={formik.values.qRes === "Otras_funciones"}
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
