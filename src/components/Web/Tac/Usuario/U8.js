import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U8.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U8(props) {
  const { criteria, setCriteria, qData } = props;

  const { sID } = criteria;

  const [button, setButton] = useState(null);

  console.log("qData", qData);

  const formik = useFormik({
    initialValues: initialValues(qData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("onSubmit");
      console.log("formValue", formValue);
      try {
        const newData = {
          folio: qData.folio,
          qID: qData.qID,
          qRes: {
            U8: formValue.U8,
            otro: formValue.U8.includes("U8_6") ? formValue.otro : "",
          },
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

  console.log(formik.values);
  return (
    <div className="u8">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U8.- Elementos de calidad más valorados
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen
          </Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field
            label="Entregas a tiempo"
            control="input"
            type="checkbox"
            name="U8"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U8_1"
            checked={formik.values.U8.includes("U8_1")}
            error={formik.errors.U8}
          />
          <Form.Field
            label="Pedidos sin daños"
            control="input"
            type="checkbox"
            name="U8"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U8_2"
            checked={formik.values.U8.includes("U8_2")}
            error={formik.errors.U8}
          />
          <Form.Field
            label="Trazabilidad de los pedidos"
            control="input"
            type="checkbox"
            name="U8"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U8_3"
            checked={formik.values.U8.includes("U8_3")}
            error={formik.errors.U8}
          />
          <Form.Field
            label="Facilidad en procesos de logística inversa"
            control="input"
            type="checkbox"
            name="U8"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U8_4"
            checked={formik.values.U8.includes("U8_4")}
            error={formik.errors.U8}
          />
          <Form.Field
            label="Facilidad en procesos de logística inversa"
            control="input"
            type="checkbox"
            name="U8"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U8_5"
            checked={formik.values.U8.includes("U8_5")}
            error={formik.errors.U8}
          />
          <Form.Field
            label="Otros (especifique)"
            control="input"
            type="checkbox"
            name="U8"
            //id="qRes2"
            onChange={formik.handleChange}
            value="U8_6"
            checked={formik.values.U8.includes("U8_6")}
            error={formik.errors.U8}
          />
          {formik.values.U8.includes("U8_6") ? (
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
