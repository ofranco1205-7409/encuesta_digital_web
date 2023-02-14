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
import { initialValues, validationSchema } from "./C4_2.form";
import { NavigationButtons } from "../NavigationButtons";
//import "./C2_1.scss";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C4_2(props) {
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
    <div className="c4_2">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>C4.2.- Estructura de personal</Header.Content>
          <Header.Subheader>Complete la información.</Header.Subheader>
        </Header>

        <Form.Group grouped>
          <Form.Field
            label="Total de km/mes recorridos por unidad de carga"
            control="input"
            type="number"
            name="C4_2_1"
            min={0}
            placeholder="0"
            //id="qRes2"
            onChange={formik.handleChange}
            value={formik.values.C4_2_1}
            //checked={formik.values.qRes === "6_10"}
            error={formik.errors.C4_2_1}
          />
          <Form.Field
            label="Dato no disponible"
            control="input"
            type="checkbox"
            name="C4_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value={false}
            checked={formik.values.C4_2}
            error={formik.errors.C4_2}
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
