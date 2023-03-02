import React, { useState } from "react";
import { Form, Header,Message  } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C1_2.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C1_2(props) {
  const { criteria, setCriteria, qData } = props;

  const { sID } = criteria;

  const [button, setButton] = useState(null);

  console.log("C1_2 qData", qData);

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
          qRes: formValue.C1_2,
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
          <Header.Content>C1.2.- Relación con clientes</Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        {formik.errors.C1_2 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="A través de contratos formales"
            control="input"
            type="checkbox"
            name="C1_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="A traves de contratos formales"
            checked={formik.values.C1_2.includes(
              "A traves de contratos formales"
            )}
            //error={formik.errors.C1_2}
          />
          <Form.Field
            label="Presta servicios sin contrato"
            control="input"
            type="checkbox"
            name="C1_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="Presta servicios sin contrato"
            checked={formik.values.C1_2.includes(
              "Presta servicios sin contrato"
            )}
            //error={formik.errors.C1_2}
          />
          <Form.Field
            label="Acuerdos de servicio por temporada"
            control="input"
            type="checkbox"
            name="C1_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="Acuerdos de servicio por temporada"
            checked={formik.values.C1_2.includes(
              "Acuerdos de servicio por temporada"
            )}
            //error={formik.errors.C1_2}
          />
          <Form.Field
            label="Servicios puntuales, a demanda"
            control="input"
            type="checkbox"
            name="C1_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="Servicios puntuales, a demanda"
            checked={formik.values.C1_2.includes(
              "Servicios puntuales, a demanda"
            )}
            //error={formik.errors.C1_2}
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
