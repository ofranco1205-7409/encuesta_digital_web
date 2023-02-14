import React, { useEffect, useState } from "react";
import {
  Form,
  Accordion,
  Icon,
  Divider,
  Header,
  Label,
  Segment,
  Input,
  Message,
} from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C1_1.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";
import "./C1_1.scss";
import { size } from "lodash";

const tacController = new Tac();
const tn = new TacNavigation();

export function C1_1(props) {
  const { criteria, setCriteria, qData } = props;

  const { folio, sID, qID } = criteria;

  const [button, setButton] = useState(null);

  console.log("qData", qData);

  const formik = useFormik({
    initialValues: initialValues(qData.qRes),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formValue", formValue);
      try {
        const newData = {
          folio: qData.folio,
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

  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    let sum = 0;
    Object.entries(formik.values).forEach(([key, value]) => {
      if (!(key === "otros_costos")) {
        sum = sum + Number(value);
      }
    });

    setPercentage(sum);
  }, [formik.values]);

  return (
    <div className="c1_1">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>C1.1- Mercados que atiende</Header.Content>
          <Header.Subheader>
            Coloque el porcentaje aproximado de cada actividad en su negocio
          </Header.Subheader>
        </Header>

        <b>Comercio exterior</b>
        <Divider />
        <Form.Group grouped>
          <Form.Field>
            <Input
              size="mini"
              name="importaciones"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.importaciones}
              error={formik.errors.importaciones}
            >
              <input />
              <Label>%</Label>
              <Label basic>Importaciones</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="exportaciones"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.exportaciones}
              error={formik.errors.exportaciones}
            >
              <input />
              <Label>%</Label>
              <Label basic>Exportaciones</Label>
            </Input>
          </Form.Field>
        </Form.Group>
        <b>Otros</b>
        <Divider />
        <Form.Group grouped>
          <Form.Field>
            <Input
              size="mini"
              name="almacenista"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.almacenista}
              error={formik.errors.almacenista}
            >
              <input />
              <Label>%</Label>
              <Label basic>Almacenista</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="agente_de_carga"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.agente_de_carga}
              error={formik.errors.agente_de_carga}
            >
              <input />
              <Label>%</Label>
              <Label basic>Agente de carga</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="agente_de_aduanas"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.agente_de_aduanas}
              error={formik.errors.agente_de_aduanas}
            >
              <input />
              <Label>%</Label>
              <Label basic>Agente de aduanas</Label>
            </Input>
          </Form.Field>

          <Form.Field>
            <Input
              size="mini"
              name="agente_naviero_consignatario"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.agente_naviero_consignatario}
              error={formik.errors.agente_naviero_consignatario}
            >
              <input />
              <Label>%</Label>
              <Label basic>Agente naviero, consignatario</Label>
            </Input>
          </Form.Field>
        </Form.Group>

        <Divider />
        {percentage > 100 ? (
          <Message
            negative
            icon="percent"
            header="Porcentaje exedido"
            content={"Suma actual " + percentage}
          />
        ) : (
          <Message info icon="percent" header={"Suma actual " + percentage} />
        )}
        <p />
        <NavigationButtons
          setButton={setButton}
          formik={formik}
          progress={tn.getProgress(criteria)}
        />
      </Form>
    </div>
  );
}
