import React, { useEffect, useState } from "react";
import {
  Input,
  Label,
  Form,
  Radio,
  Checkbox,
  Divider,
  Message,
  Segment,
  Icon,
  Header,
} from "semantic-ui-react";
import { useFormik, Field } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C2_1.form";
import { NavigationButtons } from "../NavigationButtons";
import "./C2_1.scss";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C2_1(props) {
  const { criteria, setCriteria, qData } = props;

  const { folio, sID, qID } = criteria;

  const [button, setButton] = useState(null);

  console.log("qData", qData);

  const formik = useFormik({
    initialValues: initialValues(qData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formValue", formValue);
      //let qRes_tmp={...formValue}
      //delete qRes_tmp.qRes
      //delete qRes_tmp.qRes
      try {
        const newData = {
          folio: folio,
          qID: qData.qID,
          qRes: { ...formValue },
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
    <div className="c2_1">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>C2.1.- Estructura de personal</Header.Content>
          <Header.Subheader>Complete la información.</Header.Subheader>
        </Header>

        <Segment>
          <Label as="a" color="blue" ribbon>
            <Icon name="truck" />
            Número de conductores habituales
          </Label>

          <Form.Group widths="2">
            <Form.Field
              label="Conductores con contrato"
              control="input"
              type="number"
              name="conductores_con_contrato"
              min={0}
              placeholder="0"
              //id="qRes2"
              onChange={formik.handleChange}
              value={formik.values.conductores_con_contrato}
              error={formik.errors.conductores_con_contrato}
            />
            <Form.Field
              label="Conductores que cobran por servicio"
              control="input"
              type="number"
              name="conductores_que_cobran_por_servicio"
              min={0}
              placeholder="0"
              //id="qRes2"
              onChange={formik.handleChange}
              value={formik.values.conductores_que_cobran_por_servicio}
              //checked={formik.values.qRes === "6_10"}
              error={formik.errors.conductores_que_cobran_por_servicio}
            />
          </Form.Group>
        </Segment>

        <Form.Group grouped>
          <Form.Field
            label="Cantidad de conductores por unidad de transporte"
            control="input"
            type="number"
            name="conductores_por_unidad_de_transporte"
            min={0}
            placeholder="0"
            //id="qRes2"
            onChange={formik.handleChange}
            value={formik.values.conductores_por_unidad_de_transporte}
            //checked={formik.values.qRes === "6_10"}
            error={formik.errors.conductores_por_unidad_de_transporte}
          />
        </Form.Group>

        <Form.Group>
          <Form.Field label="¿Tiene dificultades para encontrar conductores?" />
          <Form.Field
            label="Si"
            control="input"
            type="radio"
            name="dificultades_para_encontrar_conductores"
            onChange={formik.handleChange}
            value="Si"
            checked={
              formik.values.dificultades_para_encontrar_conductores === "Si"
            }
            error={formik.errors.dificultades_para_encontrar_conductores}
          />
          <Form.Field
            label="No"
            control="input"
            type="radio"
            name="dificultades_para_encontrar_conductores"
            //id="qRes2"
            onChange={formik.handleChange}
            value="No"
            checked={
              formik.values.dificultades_para_encontrar_conductores === "No"
            }
            error={formik.errors.dificultades_para_encontrar_conductores}
          />
        </Form.Group>

        <Divider />
        <NavigationButtons
          setButton={setButton}
          formik={formik}
          progress={tn.getProgress(criteria)}
        />
      </Form>
    </div>
  );
}
