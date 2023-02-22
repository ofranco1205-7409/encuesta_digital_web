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
import { initialValues, validationSchema } from "./C8.form";
import { NavigationButtons } from "../NavigationButtons";
//import "./C2_1.scss";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C8(props) {
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
    <div className="c8">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C8.- ¿Considera que sus clientes y el Sector Público tienen un mayor
            nivel de digitalización?
          </Header.Content>
          <Header.Subheader>Conteste sí o no en cada opción</Header.Subheader>
        </Header>

        <Form.Group>
          <Form.Field label="Clientes finales/propietarios de la mercancía en importación" />
          <Form.Field
            label="Si"
            control="input"
            type="radio"
            name="C8_1"
            onChange={formik.handleChange}
            value="Si"
            checked={formik.values.C8_1 === "Si"}
            error={formik.errors.C8_1}
          />
          <Form.Field
            label="No"
            control="input"
            type="radio"
            name="C8_1"
            //id="qRes2"
            onChange={formik.handleChange}
            value="No"
            checked={formik.values.C8_1 === "No"}
            error={formik.errors.C8_1}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field label="Clientes finales/propietarios de la mercancía en exportación" />
          <Form.Field
            label="Si"
            control="input"
            type="radio"
            name="C8_2"
            onChange={formik.handleChange}
            value="Si"
            checked={formik.values.C8_2 === "Si"}
            error={formik.errors.C8_2}
          />
          <Form.Field
            label="No"
            control="input"
            type="radio"
            name="C8_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="No"
            checked={formik.values.C8_2 === "No"}
            error={formik.errors.C8_2}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field label="Agentes del sector logístico (transitarios, agentes de carga y agentes de aduana)" />
          <Form.Field
            label="Si"
            control="input"
            type="radio"
            name="C8_3"
            onChange={formik.handleChange}
            value="Si"
            checked={formik.values.C8_3 === "Si"}
            error={formik.errors.C8_3}
          />
          <Form.Field
            label="No"
            control="input"
            type="radio"
            name="C8_3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="No"
            checked={formik.values.C8_3 === "No"}
            error={formik.errors.C8_3}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field label="Navieras y consignatarios" />
          <Form.Field
            label="Si"
            control="input"
            type="radio"
            name="C8_4"
            onChange={formik.handleChange}
            value="Si"
            checked={formik.values.C8_4 === "Si"}
            error={formik.errors.C8_4}
          />
          <Form.Field
            label="No"
            control="input"
            type="radio"
            name="C8_4"
            //id="qRes2"
            onChange={formik.handleChange}
            value="No"
            checked={formik.values.C8_4 === "No"}
            error={formik.errors.C8_4}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field label="Dirección de Aduanas" />
          <Form.Field
            label="Si"
            control="input"
            type="radio"
            name="C8_5"
            onChange={formik.handleChange}
            value="Si"
            checked={formik.values.C8_5 === "Si"}
            error={formik.errors.C8_5}
          />
          <Form.Field
            label="No"
            control="input"
            type="radio"
            name="C8_5"
            //id="qRes2"
            onChange={formik.handleChange}
            value="No"
            checked={formik.values.C8_5 === "No"}
            error={formik.errors.C8_5}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field label="Resto del Sector Público" />
          <Form.Field
            label="Si"
            control="input"
            type="radio"
            name="C8_6"
            onChange={formik.handleChange}
            value="Si"
            checked={formik.values.C8_6 === "Si"}
            error={formik.errors.C8_6}
          />
          <Form.Field
            label="No"
            control="input"
            type="radio"
            name="C8_6"
            //id="qRes2"
            onChange={formik.handleChange}
            value="No"
            checked={formik.values.C8_6 === "No"}
            error={formik.errors.C8_6}
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
