import React, { useState } from "react";
import { Form, Radio, Checkbox, Header, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./B2.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../../../../components/Web/Tac/TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function B2(props) {
  const { criteria, setCriteria, qData } = props;
  const { folio, sID } = criteria;

  const [button, setButton] = useState(null);

  console.log("qData", qData);

  /*
  const next = (i) => {
    if (i > criteria.survey[sID].questions.length - 1) {
      i = criteria.survey[sID].questions.length - 1;
    }
    setCriteria({ ...criteria, qIndex: i });
  };

  const previous = (i) => {
    if (i < 0) {
      i = 0;
    }
    setCriteria({ ...criteria, qIndex: i });
  };
*/

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
        /*
        if (button === "anterior") {
          console.log("Button 1 clicked!");
          criteria.previous(criteria.qIndex - 1);
        } else if (button === "siguiente") {
          console.log("Button 2 clicked!");
          criteria.next(criteria.qIndex + 1);
        }*/
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="tac-form">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            B2.- Tamaño de la empresa en número de empleados
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
            label="MiPYMEc(< 10 empleados)"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes1
            onChange={formik.handleChange}
            value="B2_1"
            checked={formik.values.qRes === "B2_1"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="PYME (11-50 empleados)"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes2"
            onChange={formik.handleChange}
            value="B2_2"
            checked={formik.values.qRes === "B2_2"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="Mediana empresa (51-150 empleados)"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="B2_3"
            checked={formik.values.qRes === "B2_3"}
            //error={formik.errors.qRes}
          />
          <Form.Field
            label="Gran empresa (> 150 empleados)"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes4"
            onChange={formik.handleChange}
            value="B2_4"
            checked={formik.values.qRes === "B2_4"}
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
