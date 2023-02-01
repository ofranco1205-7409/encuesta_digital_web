import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./B3.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../../../../components/Web/Tac/TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function B3(props) {
  const { criteria, setCriteria, qData } = props;

  const { sID } = criteria;

  const [button, setButton] = useState(null);

  console.log(qData);

  /*
  const next = (i) => {
    if (i > criteria.survey[sID].questions.length - 1) {
      i = criteria.survey[sID].questions.length - 1;
    }
    setCriteria({ ...criteria, qIndex: i });
    console.log(i);
    console.log(criteria.qIndex);
  };

  const previous = (i) => {
    if (i < 0) {
      i = 0;
    }
    setCriteria({ ...criteria, qIndex: i });
    console.log(i);
    console.log(criteria.qIndex);
  };
*/

  const formik = useFormik({
    initialValues: initialValues(qData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("onSubmit");
      console.log(formValue);
      try {
        const newData = {
          folio: qData.folio,
          qID: qData.qID,
          qRes: formValue.B3,
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
        /*
        if (button === 1) {
          console.log("Button 1 clicked!");
          previous(criteria.qIndex - 1);
        } else if (button === 2) {
          console.log("Button 2 clicked!");
          next(criteria.qIndex + 1);
        }
        */
      } catch (error) {
        console.error(error);
      }
    },
  });

  console.log(formik.values);
  return (
    <div className="tac-form">
      <Form onSubmit={formik.handleSubmit}>
        <h2>B.3. Rango de ventas anuales</h2>
        <Form.Group grouped>
          <Form.Field
            label="$0-$1,000"
            control="input"
            type="checkbox"
            name="B3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="A"
            checked={formik.values.B3.includes("A")}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="$1,001-$10,0000"
            control="input"
            type="checkbox"
            name="B3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="B"
            checked={formik.values.B3.includes("B")}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="$1,001-$10,0000"
            control="input"
            type="checkbox"
            name="B3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="C"
            checked={formik.values.B3.includes("C")}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="$1,001-$10,0000"
            control="input"
            type="checkbox"
            name="B3"
            //id="qRes2"
            onChange={formik.handleChange}
            value="D"
            checked={formik.values.B3.includes("D")}
            error={formik.errors.qRes}
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
