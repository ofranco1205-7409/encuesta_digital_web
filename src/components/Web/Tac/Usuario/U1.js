import React, { useEffect, useState } from "react";
import {
  Input,
  Label,
  Form,
  Radio,
  Checkbox,
  Divider,
  Message,
  Header,
} from "semantic-ui-react";
import { useFormik, Field } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U1.form";
import { NavigationButtons } from "../NavigationButtons";
import "./U1.scss";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U1(props) {
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

  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    let sum = 0;
    Object.entries(formik.values).forEach(([key, value]) => {
      if (!(key === "otros_costos")) {
        sum = sum + Number(value);
      }
    });

    /*
    let sum = Object.values(formik.values).reduce(function (
      accumulator,
      curValue
    ) {
      return accumulator + Number(curValue);
    },
    0);
    */

    //console.log("formik.values", formik.values);
    setPercentage(sum);
  }, [formik.values]);

  return (
    <div className="u1">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U1. ¿Cuál es su principal ámbito de negocio?
          </Header.Content>
          <Header.Subheader>
            Coloque el % aproximado de cada actividad en su negocio
          </Header.Subheader>
        </Header>

        <Form.Group grouped>
          <Form.Field>
            <Input
              size="mini"
              name="insumos_importados"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.insumos_importados}
              error={formik.errors.insumos_importados}
            >
              <input />
              <Label>%</Label>
              <Label basic>Porcentaje de insumos importados</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="produccion_exportada"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.produccion_exportada}
              error={formik.errors.produccion_exportada}
            >
              <input />
              <Label>%</Label>
              <Label basic>Porcentaje de producción exportada</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="mercado_domestico"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.mercado_domestico}
              error={formik.errors.mercado_domestico}
            >
              <input />
              <Label>%</Label>
              <Label basic>Porcentaje del mercado doméstico</Label>
            </Input>
          </Form.Field>
        </Form.Group>
        <Divider />

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
