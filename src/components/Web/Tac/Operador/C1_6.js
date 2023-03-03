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
            no_se_cobra: formValue.no_se_cobra,
            horas_exentas: formValue.horas_exentas,
            tarifa_hora: formValue.tarifa_hora,
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
          <Header.Subheader>
            Señale la cantidad de horas de espera gratis y la tarifa que aplica
            por esperar cuando aplica el cobro
          </Header.Subheader>
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
            type="checkbox"
            name="no_se_cobra"
            onChange={formik.handleChange}
            value={true}
            checked={formik.values.no_se_cobra}
            error={formik.errors.no_se_cobra}
          />
          <Form.Field
            label="Cantidad de horas exentas de cobro"
            control="input"
            type="number"
            min="1"
            name="horas_exentas"
            placeholder="Horas gratis"
            //id="qRes2"
            onChange={formik.handleChange}
            value={formik.values.horas_exentas}
            error={formik.errors.horas_exentas}
          />
          <Form.Field
            label="Tarifa aplicada por hora de espera"
            control="input"
            type="number"
            min="1"
            name="tarifa_hora"
            placeholder="Tarifa"
            //id="qRes2"
            onChange={formik.handleChange}
            value={formik.values.tarifa_hora}
            error={formik.errors.tarifa_hora}
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
