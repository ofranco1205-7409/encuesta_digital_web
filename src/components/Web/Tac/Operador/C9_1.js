import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C9_1.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C9_1(props) {
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
          qRes: formValue.C9_1,
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

  const handleCheck = (e, id) => {
    formik.handleChange(e);

    const field_name = "C9_1";
    const valuesArr = formik.values.C9_1;
    const excluye_option = "C9.1_5";

    const include = valuesArr.includes(excluye_option);

    if (id === excluye_option) {
      if (!include) {
        formik.setFieldValue(field_name, [id]);
      }
    } else {
      if (include) {
        formik.setFieldValue(field_name, [id]);
      }
    }
  };

  console.log(formik.values);
  return (
    <div className="C9_1">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C9.1.- ¿Realiza mediciones de sostenibilidad?
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        {formik.errors.C9_1 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="Consumo de servicios (agua, energía, gas, basura, etc)"
            control="input"
            type="checkbox"
            name="C9_1"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C9.1_1")}
            value="C9.1_1"
            checked={formik.values.C9_1.includes("C9.1_1")}
            //error={formik.errors.C9_1}
          />
          <Form.Field
            label="Manejo de residuos (desechos sólidos, líquidos, consumo de papel, productos tóxicos, etc.)"
            control="input"
            type="checkbox"
            name="C9_1"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C9.1_2")}
            value="C9.1_2"
            checked={formik.values.C9_1.includes("C9.1_2")}
            //error={formik.errors.C9_1}
          />
          <Form.Field
            label="Mediciones asociadas a la huella de carbono (consumo de combustibles, CO2, gases de efecto invernadero, etc.)"
            control="input"
            type="checkbox"
            name="C9_1"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C9.1_3")}
            value="C9.1_3"
            checked={formik.values.C9_1.includes("C9.1_3")}
            //error={formik.errors.C9_1}
          />
          <Form.Field
            label="Generación periódica de informes de cumplimiento ambiental (ICA, etc.)"
            control="input"
            type="checkbox"
            name="C9_1"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C9.1_4")}
            value="C9.1_4"
            checked={formik.values.C9_1.includes("C9.1_4")}
            //error={formik.errors.C9_1}
          />
          <Form.Field
            label="No realiza ningún tipo de medición"
            control="input"
            type="checkbox"
            name="C9_1"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C9.1_5")}
            value="C9.1_5"
            checked={formik.values.C9_1.includes("C9.1_5")}
            //error={formik.errors.C9_1}
          />
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
