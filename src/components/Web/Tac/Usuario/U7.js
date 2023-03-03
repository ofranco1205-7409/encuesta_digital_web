import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U7.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U7(props) {
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
          qRes: formValue.U7,
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

    const field_name = "U7";
    const valuesArr = formik.values.U7;
    const excluye_option = "U7_4";
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
    <div className="u7">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>U7.- Medición de tiempos</Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen
          </Header.Subheader>
        </Header>
        {formik.errors.U7 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="Se miden separadamente tiempos de carga y descarga"
            control="input"
            type="checkbox"
            name="U7"
            //id="qRes2"
            //onChange={formik.handleChange}
            onChange={(e) => handleCheck(e, "U7_1")}
            value="U7_1"
            checked={formik.values.U7.includes("U7_1")}
            //error={formik.errors.U7}
          />
          <Form.Field
            label="Se miden conjuntamente tiempos de carga y descarga"
            control="input"
            type="checkbox"
            name="U7"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "U7_2")}
            value="U7_2"
            checked={formik.values.U7.includes("U7_2")}
            //error={formik.errors.U7}
          />
          <Form.Field
            label="Se miden los tiempos de espera"
            control="input"
            type="checkbox"
            name="U7"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "U7_3")}
            value="U7_3"
            checked={formik.values.U7.includes("U7_3")}
            //error={formik.errors.U7}
          />
          <Form.Field
            label="No se realizan mediciones de tiempos"
            control="input"
            type="checkbox"
            name="U7"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "U7_4")}
            value="U7_4"
            checked={formik.values.U7.includes("U7_4")}
            //error={formik.errors.U7}
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
