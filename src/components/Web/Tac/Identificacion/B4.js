import React, { useState } from "react";
import { Form, Radio, Checkbox } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./B4.form";

const tacController = new Tac();

export function B4(props) {
  const { criteria, setCriteria, qData } = props;

  const { folio, sID, qID } = criteria;

  const [button, setButton] = useState(null);

  console.log(qData);
  console.log(criteria.survey[sID].questions);

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
        if (qData.qRes) {
          console.log("Update question");
          await tacController.updateQuestion(newData);
        } else {
          console.log("Insert question");
          await tacController.createQuestion(newData);
        }

        if (button === 1) {
          console.log("Button 1 clicked!");
          previous(criteria.qIndex - 1);
        } else if (button === 2) {
          console.log("Button 2 clicked!");
          next(criteria.qIndex + 1);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="tac-form">
      <Form onSubmit={formik.handleSubmit}>
        <h2>B.4. Tamaño de la empresa en número de empleados </h2>
        <Form.Group grouped>
          <Form.Field
            label="MiPYMEc(< 10 empleados)"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes1
            /*
            onChange={(_, data) => {
              console.log(data.value);
              formik.setFieldValue("Res1", data.value);
            }}*/
            onChange={formik.handleChange}
            value="A"
            checked={formik.values.qRes === "A"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="PYME (11-50 empleados)"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes2"
            onChange={formik.handleChange}
            value="B"
            checked={formik.values.qRes === "B"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="Mediana empresa (51-150 empleados)"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes3"
            onChange={formik.handleChange}
            value="C"
            checked={formik.values.qRes === "C"}
            error={formik.errors.qRes}
          />
          <Form.Field
            label="Gran empresa (> 150 empleados)"
            control="input"
            type="radio"
            name="qRes"
            //id="qRes4"
            onChange={formik.handleChange}
            value="D"
            checked={formik.values.qRes === "D"}
            error={formik.errors.qRes}
          />
        </Form.Group>
        <div className="tac-form__buttons">
          <Form.Button
            type="submit"
            value="1"
            secondary
            loading={formik.isSubmitting}
            onClick={() => {
              setButton(1);
            }}
          >
            Anterior B4
          </Form.Button>

          <Form.Button
            type="submit"
            value="2"
            primary
            fluid
            loading={formik.isSubmitting}
            onClick={() => {
              setButton(2);
            }}
          >
            Siguiente B4
          </Form.Button>
        </div>
      </Form>
    </div>
  );
}
