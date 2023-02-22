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
import { initialValues, validationSchema } from "./U9.form";
import { NavigationButtons } from "../NavigationButtons";
import "./U9.scss";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U9(props) {
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

    //console.log("formik.values", formik.values);
    setPercentage(sum);
  }, [formik.values]);

  return (
    <div className="u9">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U9.- Entre 1 y 10 (menor a mayor), ¿qué puntuación le daría a los
            servicios de transporte y logística que recibe?
          </Header.Content>
          <Header.Subheader>
            Puntúe de 1 a 10 cada uno de los tres tipos de servicio
          </Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field>
            <Input
              size="mini"
              name="transporte"
              labelPosition="right"
              type="number"
              min={1}
              max={10}
              placeholder="10"
              onChange={formik.handleChange}
              value={formik.values.transporte}
              error={formik.errors.transporte}
            >
              <input />
              <Label> </Label>
              <Label basic>Transporte</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="almacenamiento"
              labelPosition="right"
              type="number"
              min={1}
              max={10}
              placeholder="10"
              onChange={formik.handleChange}
              value={formik.values.almacenamiento}
              error={formik.errors.almacenamiento}
            >
              <input />
              <Label> </Label>
              <Label basic>Almacenamiento</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="gestion_logistica"
              labelPosition="right"
              type="number"
              min={1}
              max={10}
              placeholder="10"
              onChange={formik.handleChange}
              value={formik.values.gestion_logistica}
              error={formik.errors.gestion_logistica}
            >
              <input />
              <Label> </Label>
              <Label basic>Gestión logística</Label>
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
