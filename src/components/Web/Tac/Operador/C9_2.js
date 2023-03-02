import React, { useState } from "react";
import { Form, Radio, Checkbox, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C9_2.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C9_2(props) {
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
          qRes: formValue.qRes,
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
    <div className="C9_2">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C9.2.- ¿Tiene previsto adquirir nuevos vehículos más sostenibles?
          </Header.Content>
          <Header.Subheader>Seleccione una opcion.</Header.Subheader>
        </Header>
        {formik.errors.qRes ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Form.Group grouped>
          <Form.Field
            label="Sí, a corto plazo "
            control="input"
            type="radio"
            name="qRes"
            //id="qRes1
            onChange={formik.handleChange}
            value="C9.2_1"
            checked={formik.values.qRes === "C9.2_1"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="Sí, pero prefiere esperar a tener más información y garantías sobre las nuevas energías"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C9.2_2"
            checked={formik.values.qRes === "C9.2_2"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="Sí, pero serán vehículos de segunda mano"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C9.2_3"
            checked={formik.values.qRes === "C9.2_3"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="No por ahora"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C9.2_4"
            checked={formik.values.qRes === "C9.2_4"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="No lo contempla"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C9.2_5"
            checked={formik.values.qRes === "C9.2_5"}
            //error={formik.errors.qRes}
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
