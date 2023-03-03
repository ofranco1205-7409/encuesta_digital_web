import React, { useState } from "react";
import { Form, Radio, Checkbox, Header, Message } from "semantic-ui-react";
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
          qRes: {
            C1_6: formValue.C1_6,
            horas_exentas:
              formValue.C1_6 === "C1.6_2" ? formValue.horas_exentas : "",
            tarifa_hora:
              formValue.C1_6 === "C1.6_3" ? formValue.tarifa_hora : "",
          },
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
        {formik.errors.C1_6 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="No se cobra"
            control="input"
            type="radio"
            name="C1_6"
            //id="qRes1
            /*
            onChange={(_, data) => {
              console.log(data.value);
              formik.setFieldValue("Res1", data.value);
            }}*/
            onChange={formik.handleChange}
            value="C1.6_1"
            checked={formik.values.C1_6 === "C1.6_1"}
            //error={formik.errors.C1_6}
          />
          <Form.Field
            label="Cantidad de horas exentas de cobro"
            control="input"
            type="radio"
            name="C1_6"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C1.6_2"
            checked={formik.values.C1_6 === "C1.6_2"}
            //error={formik.errors.C1_6}
          />
          {formik.values.C1_6 === "C1.6_2" ? (
            <Form.Field
              label=""
              control="input"
              type="number"
              min="1"
              name="horas_exentas"
              placeholder="Indicar cantidad de horas gratis"
              //id="qRes2"
              onChange={formik.handleChange}
              value={formik.values.horas_exentas}
              error={formik.errors.horas_exentas}
            />
          ) : (
            <p></p>
          )}
          <Form.Field
            label="Tarifa aplicada por hora de espera"
            control="input"
            type="radio"
            name="C1_6"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C1.6_3"
            checked={formik.values.C1_6 === "C1.6_3"}
            //error={formik.errors.C1_6}
          />
          {formik.values.C1_6 === "C1.6_3" ? (
            <Form.Field
              label=""
              control="input"
              type="number"
              min="1"
              name="tarifa_hora"
              placeholder="Indicar tarifa"
              //id="qRes2"
              onChange={formik.handleChange}
              value={formik.values.tarifa_hora}
              error={formik.errors.tarifa_hora}
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
