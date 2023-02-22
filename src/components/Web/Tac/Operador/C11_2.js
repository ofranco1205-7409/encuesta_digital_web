import React, { useState } from "react";
import { Form, Radio, Checkbox, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C11_2.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C11_2(props) {
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
            C11_2: formValue.C11_2,
            otro: formValue.C11_2 === "C11.2_6" ? formValue.otro : "",
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
    <div className="c11_2">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C11.2.- ¿Participa en procesos colaborativos sobre transporte y
            logística con el Sector Público?
          </Header.Content>
          <Header.Subheader>Seleccione una opcion.</Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="Sí, participa en reuniones sectoriales sobre competitividad logística"
            control="input"
            type="radio"
            name="C11_2"
            //id="qRes1
            onChange={formik.handleChange}
            value="C11.2_1"
            checked={formik.values.C11_2 === "C11.2_1"}
            error={formik.errors.C11_2}
          />
          <Form.Field
            label="Sí, participa en proyectos para la mejora de la operación del Sector"
            control="input"
            type="radio"
            name="C11_2"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C11.2_2"
            checked={formik.values.C11_2 === "C11.2_2"}
            error={formik.errors.C11_2}
          />
          <Form.Field
            label="Sí, participa en mesas de trabajo sobre comercio exterior"
            control="input"
            type="radio"
            name="C11_2"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C11.2_3"
            checked={formik.values.C11_2 === "C11.2_3"}
            error={formik.errors.C11_2}
          />
          <Form.Field
            label="No participa de forma habitual"
            control="input"
            type="radio"
            name="C11_2"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C11.2_4"
            checked={formik.values.C11_2 === "C11.2_4"}
            error={formik.errors.C11_2}
          />
          <Form.Field
            label="No le interesa participar/no es convocado"
            control="input"
            type="radio"
            name="C11_2"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C11.2_5"
            checked={formik.values.C11_2 === "C11.2_5"}
            error={formik.errors.C11_2}
          />
          <Form.Field
            label="Otro (especifique)"
            control="input"
            type="radio"
            name="C11_2"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C11.2_6"
            checked={formik.values.C11_2 === "C11.2_6"}
            error={formik.errors.C11_2}
          />
          {formik.values.C11_2 === "C11.2_6" ? (
            <Form.Field
              label=""
              control="input"
              type="text"
              name="otro"
              placeholder=""
              //id="qRes2"
              onChange={formik.handleChange}
              value={formik.values.otro}
              error={formik.errors.otro}
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
