import React, { useState } from "react";
import { Form, Radio, Checkbox, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U18.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U18(props) {
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
            participa: formValue.participa,
            otro: formValue.participa === "U18_6" ? formValue.otro : "",
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
    <div className="u18">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U18.- ¿Participa en procesos colaborativos sobre transporte y
            logística con el Sector Público?
          </Header.Content>
          <Header.Subheader>Escoja solo una opción</Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="Sí, participa en reuniones sectoriales sobre competitividad logística"
            control="input"
            type="radio"
            name="participa"
            //id="qRes1
            onChange={formik.handleChange}
            value="U18_1"
            checked={formik.values.participa === "U18_1"}
            error={formik.errors.participa}
          />
          <Form.Field
            label="Sí, participa en proyectos para la mejora de la operación del Sector"
            control="input"
            type="radio"
            name="participa"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U18_2"
            checked={formik.values.participa === "U18_2"}
            error={formik.errors.participa}
          />
          <Form.Field
            label="Sí, participa en mesas de trabajo sobre comercio exterior"
            control="input"
            type="radio"
            name="participa"
            //id="qRes3"
            onChange={formik.handleChange}
            value="U18_3"
            checked={formik.values.participa === "U18_3"}
            error={formik.errors.participa}
          />
          <Form.Field
            label="No participa de forma habitual"
            control="input"
            type="radio"
            name="participa"
            //id="qRes3"
            onChange={formik.handleChange}
            value="U18_4"
            checked={formik.values.participa === "U18_4"}
            error={formik.errors.participa}
          />
          <Form.Field
            label="No le interesa participar/no es convocado"
            control="input"
            type="radio"
            name="participa"
            //id="qRes3"
            onChange={formik.handleChange}
            value="U18_5"
            checked={formik.values.participa === "U18_5"}
            error={formik.errors.participa}
          />
          <Form.Field
            label="Otro (especifique)"
            control="input"
            type="radio"
            name="participa"
            //id="qRes3"
            onChange={formik.handleChange}
            value="U18_6"
            checked={formik.values.participa === "U18_6"}
            error={formik.errors.participa}
          />
          {formik.values.participa === "U18_6" ? (
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
