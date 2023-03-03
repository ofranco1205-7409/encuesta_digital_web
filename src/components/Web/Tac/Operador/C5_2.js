import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C5_2.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C5_2(props) {
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
          qRes: formValue.C5_2,
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
    /*
    const listItem = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItem);
    */
    formik.handleChange(e);

    const field_name = "C5_2";
    const valuesArr = formik.values.C5_2;
    const excluye_option = "C5.2_10";

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
    <div className="c5_2">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C5.2.- ¿Con qué certificaciones cuenta actualmente?
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        {formik.errors.C5_2 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="OEA"
            control="input"
            type="checkbox"
            name="C5_2"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C5.2_1")}
            value="C5.2_1"
            checked={formik.values.C5_2.includes("C5.2_1")}
            //error={formik.errors.C5_2}
          />
          <Form.Field
            label="BASC (Business Alliance for Security)"
            control="input"
            type="checkbox"
            name="C5_2"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C5.2_2")}
            value="C5.2_2"
            checked={formik.values.C5_2.includes("C5.2_2")}
            //error={formik.errors.C5_2}
          />
          <Form.Field
            label="IATA"
            control="input"
            type="checkbox"
            name="C5_2"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C5.2_3")}
            value="C5.2_3"
            checked={formik.values.C5_2.includes("C5.2_3")}
            //error={formik.errors.C5_2}
          />
          <Form.Field
            label="C-TPAT (OEA @USA)"
            control="input"
            type="checkbox"
            name="C5_2"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C5.2_4")}
            value="C5.2_4"
            checked={formik.values.C5_2.includes("C5.2_4")}
            //error={formik.errors.C5_2}
          />
          <Form.Field
            label="ISO9001"
            control="input"
            type="checkbox"
            name="C5_2"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C5.2_5")}
            value="C5.2_5"
            checked={formik.values.C5_2.includes("C5.2_5")}
            //error={formik.errors.C5_2}
          />
          <Form.Field
            label="ISO14001 (Implementación Sistema de Gestión Ambiental)"
            control="input"
            type="checkbox"
            name="C5_2"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C5.2_6")}
            value="C5.2_6"
            checked={formik.values.C5_2.includes("C5.2_6")}
            //error={formik.errors.C5_2}
          />
          <Form.Field
            label="ISO28000 (Seguridad en la Cadena de Suministros)"
            control="input"
            type="checkbox"
            name="C5_2"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C5.2_7")}
            value="C5.2_7"
            checked={formik.values.C5_2.includes("C5.2_7")}
            //error={formik.errors.C5_2}
          />
          <Form.Field
            label="ISO45001 (Sistema Gestión Seguridad y Salud en el trabajo)"
            control="input"
            type="checkbox"
            name="C5_2"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C5.2_8")}
            value="C5.2_8"
            checked={formik.values.C5_2.includes("C5.2_8")}
            //error={formik.errors.C5_2}
          />
          <Form.Field
            label="Otras"
            control="input"
            type="checkbox"
            name="C5_2"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C5.2_9")}
            value="C5.2_9"
            checked={formik.values.C5_2.includes("C5.2_9")}
            //error={formik.errors.C5_2}
          />
          <Form.Field
            label="Ninguna"
            control="input"
            type="checkbox"
            name="C5_2"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "C5.2_10")}
            value="C5.2_10"
            checked={formik.values.C5_2.includes("C5.2_10")}
            //error={formik.errors.C5_2}
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
