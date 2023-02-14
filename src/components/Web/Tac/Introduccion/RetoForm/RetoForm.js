import React, { useState, useEffect } from "react";
import { Form, Dropdown, Input, Label } from "semantic-ui-react";
import { size, map } from "lodash";
import { useFormik } from "formik";
import { Tac } from "../../../../../api";
import { useAuth } from "../../../../../hooks";
import { initialValues, validationSchema } from "./RetoForm.form";

const tacController = new Tac();

export function RetoForm(props) {
  const { onClose, onReload, reto, qData } = props;
  // const { folio, sID, qID, survey, qIndex } = criteria;

  const [retos, setRetos] = useState(null);

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

  const options = () => {
    let options = [];
    if (!retos) {
      options.push({ key: "1", text: "1", value: "1" });
    } else {
      options.push(
        (options = [
          ...map(retos, (reto, i) => ({
            key: i + 1,
            text: i + 1,
            value: i + 1,
          })),
        ])
      );
      if (!reto) {
        options.push({
          key: size(retos) + 1,
          text: size(retos) + 1,
          value: size(retos) + 1,
        });
      }
    }
    return options;
  };

  const formik = useFormik({
    initialValues: initialValues(reto),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //console.log("reto", reto);
        //console.log("formValue", formValue);
        //console.log("qData", qData);
        const newReto = {
          title: formValue.title,
          order: formValue.order,
        };

        await tacController.updateRetos(
          qData,
          newReto,
          !reto ? null : reto.order,
          !reto ? "I" : "U"
        );

        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        label="Reto"
        name="title"
        placeholder="Nombre del reto"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />

      <Form.Select
        label="Prioridad del reto"
        name="order"
        placeholder=" Seleccione prioridad"
        options={options()}
        onChange={(_, data) => formik.setFieldValue("order", data.value)}
        value={formik.values.order}
        error={formik.errors.order}
      />

      <Form.Group />

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {reto ? "Actualizar reto" : "Crear reto"}
      </Form.Button>
    </Form>
  );
}
