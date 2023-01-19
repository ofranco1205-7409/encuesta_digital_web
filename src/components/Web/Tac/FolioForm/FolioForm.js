import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Folio } from "../../../../api";
import { useFolio } from "../../../../hooks";
import { inititalValues, validationSchema } from "./FolioForm.form";

const folioController = new Folio();

export function FolioForm() {
  const { setFolioCtx } = useFolio();

  const formik = useFormik({
    initialValues: inititalValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formValue", formValue);
      try {
        const response = await folioController.create(formValue);
        console.log("submit", response);

        //Equivalente a login
        const token = await folioController.encode(response);
        console.log("token", token);
        folioController.setFolioStorage(token.fToken);

        setFolioCtx(token.fToken);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo electronico"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>
    </Form>
  );
}
