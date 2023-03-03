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
        if (percentage > 0 && percentage <= 100) {
          if (qData.qRes) {
            console.log("Update question");
            await tacController.updateQuestion(newData);
          } else {
            console.log("Insert question");
            await tacController.createQuestion(newData);
          }

          tn.updateQuestion(button, setCriteria);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    let sum = 0;
    Object.entries(formik.values).forEach(([key, value]) => {
      if (!(key === "otro_detalle")) {
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
              name="distribucion_nacional"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.distribucion_nacional}
              error={formik.errors.distribucion_nacional}
            >
              <input />
              <Label>%</Label>
              <Label basic>Distribución nacional</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="servicio_centro_acopio"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.servicio_centro_acopio}
              error={formik.errors.servicio_centro_acopio}
            >
              <input />
              <Label>%</Label>
              <Label basic>Servicio a centros de acopio rural</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="distribucion_urbana"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.distribucion_urbana}
              error={formik.errors.distribucion_urbana}
            >
              <input />
              <Label>%</Label>
              <Label basic>Distribución urbana / e-commerce</Label>
            </Input>
          </Form.Field>

          <Form.Field>
            <Input
              size="mini"
              name="otros"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.otros}
              error={formik.errors.otros}
            >
              <input />
              <Label>%</Label>
              <Label basic>Otros (especifique)</Label>
            </Input>
          </Form.Field>
          <Form.Field
            label=""
            control="input"
            type="text"
            name="otro_detalle"
            placeholder=""
            //id="qRes2"
            onChange={formik.handleChange}
            value={formik.values.otro_detalle}
            error={formik.errors.otro_detalle}
          />
        </Form.Group>

        <Divider />
        {percentage === 0 ? (
          <Message
            negative
            icon="percent"
            header="Porcentaje debe ser mayor a cero"
            content={"Suma actual: " + percentage}
          />
        ) : percentage > 100 ? (
          <Message
            negative
            icon="percent"
            header="Porcentaje exedido"
            content={"Suma actual: " + percentage}
          />
        ) : (
          <Message info icon="percent" header={"Suma actual: " + percentage} />
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
