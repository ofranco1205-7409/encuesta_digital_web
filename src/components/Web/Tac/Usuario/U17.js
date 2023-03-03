import React, { useEffect, useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U17.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U17(props) {
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
          qRes: formValue.U17,
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

    const field_name = "U17";
    const valuesArr = formik.values.U17;
    const excluye_option = "U17_5";

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
    <div className="u17">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U17.- ¿Realiza mediciones de sostenibilidad?
          </Header.Content>
          <Header.Subheader>
            Marque todas las opciones que apliquen.
          </Header.Subheader>
        </Header>
        {formik.errors.U17 ? (
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
            name="U17"
            id="U17_1"
            onChange={(e) => handleCheck(e, "U17_1")}
            value="U17_1"
            checked={formik.values.U17.includes("U17_1")}
            //error={formik.errors.U17}
          />
          <Form.Field
            label="Manejo de residuos (desechos sólidos, líquidos, consumo de papel, productos tóxicos, etc.)"
            control="input"
            type="checkbox"
            name="U17"
            id="U17_2"
            onChange={(e) => handleCheck(e, "U17_2")}
            value="U17_2"
            checked={formik.values.U17.includes("U17_2")}
            //error={formik.errors.U17}
          />
          <Form.Field
            label="Mediciones asociadas a la huella de carbono (consumo de combustibles, CO2, gases de efecto invernadero, etc.)"
            control="input"
            type="checkbox"
            name="U17"
            id="U17_3"
            onChange={(e) => handleCheck(e, "U17_3")}
            value="U17_3"
            checked={formik.values.U17.includes("U17_3")}
            //error={formik.errors.U17}
          />
          <Form.Field
            label="Generación periódica de informes de cumplimiento ambiental (ICA, etc.)"
            control="input"
            type="checkbox"
            name="U17"
            id="U17_4"
            onChange={(e) => handleCheck(e, "U17_4")}
            value="U17_4"
            checked={formik.values.U17.includes("U17_4")}
            //error={formik.errors.U17}
          />
          <Form.Field
            label="No realiza mediciones de sostenibilidad"
            control="input"
            type="checkbox"
            name="U17"
            id="U17_5"
            onChange={(e) => handleCheck(e, "U17_5")}
            value="U17_5"
            checked={formik.values.U17.includes("U17_5")}
            //error={formik.errors.U17}
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
