import React, { useState, useEffect } from "react";
import { Form, Dropdown, Input, Label } from "semantic-ui-react";
import { size, map } from "lodash";
import { useFormik } from "formik";
import { Tac } from "../../../../../api";
import { useAuth } from "../../../../../hooks";
import { initialValues, validationSchema } from "./RetoDForm.form";

const tacController = new Tac();

export function RetoDForm(props) {
  const { onClose, onReload, reto, qData } = props;
  // const { folio, sID, qID, survey, qIndex } = criteria;

  /* const [retos, setRetos] = useState(null);*/
  /*
  useEffect(() => {
    (async () => {
      try {
        setRetos(null);
        const response = await tacController.getQuestions(qData);
        console.log("response", response);
        if (response[0]) {
          setRetos(response[0].qRes);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  */

  const formik = useFormik({
    initialValues: initialValues(reto),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //console.log("reto", reto);
        console.warn("formValue", formValue, reto);
        //console.log("qData", qData);
        const newReto = {
          title: reto.title,
          order: reto.order,
          detailArr: reto.detailArr,
          detail: formValue.detail,
        };
        reto.detail = formValue.detail;
        /*
        await tacController.updateRetos(
          qData,
          newReto,
          !reto ? null : reto.order,
          !reto ? "I" : "U"
        );
 
        */
        //onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group grouped>
        {reto.detailArr.map((detail, index) => {
          const check =
            size(formik.values.detail.filter((element) => element == index)) >
            0;
          //console.log("check", index, check, formik.values.detail);

          return (
            <Form.Field
              key={index}
              label={detail}
              control="input"
              type="checkbox"
              name="detail"
              //id="qRes2"
              onChange={formik.handleChange}
              value={index}
              checked={check}
              error={formik.errors.detail}
            />
          );
        })}
      </Form.Group>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Actualizar detalle
      </Form.Button>
    </Form>
  );
}
