import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U3.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U3(props) {
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
          qRes: formValue.U3,
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

    const field_name = "U3";
    const valuesArr = formik.values.U3;
    const excluye_option = "U3_1";

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
    <div className="u3">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U3.- Porcentaje de externalización de sus operaciones
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        {formik.errors.U3 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="No externaliza"
            control="input"
            type="checkbox"
            name="U3"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "U3_1")}
            value="U3_1"
            checked={formik.values.U3.includes("U3_1")}
            //error={formik.errors.U3}
          />
          <Form.Field
            label="Transporte"
            control="input"
            type="checkbox"
            name="U3"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "U3_2")}
            value="U3_2"
            checked={formik.values.U3.includes("U3_2")}
            //error={formik.errors.U3}
          />
          <Form.Field
            label="Gestión logística"
            control="input"
            type="checkbox"
            name="U3"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "U3_3")}
            value="U3_3"
            checked={formik.values.U3.includes("U3_3")}
            //error={formik.errors.U3}
          />
          <Form.Field
            label="Gestión trámites, permisos"
            control="input"
            type="checkbox"
            name="U3"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "U3_4")}
            value="U3_4"
            checked={formik.values.U3.includes("U3_4")}
            //error={formik.errors.U3}
          />
          <Form.Field
            label="Otro"
            control="input"
            type="checkbox"
            name="U3"
            //id="qRes2"
            onChange={(e) => handleCheck(e, "U3_5")}
            value="U3_5"
            checked={formik.values.U3.includes("U3_5")}
            //error={formik.errors.U3}
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
