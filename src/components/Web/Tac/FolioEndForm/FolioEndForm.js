import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Folio } from "../../../../api";
import { useFolio } from "../../../../hooks";
import { inititalValues, validationSchema } from "./FolioEndForm.form";
import { useNavigate } from "react-router-dom";

const folioController = new Folio();

export function FolioEndForm() {
  const navigate = useNavigate();
  const { folio, limpiaFolioStorage } = useFolio();

  const formik = useFormik({
    initialValues: inititalValues(folio),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formValue", formValue);
      try {
        const newData = {
          folio: folio._id,
          name: formValue.name,
          email: folio.email,
          email2: formValue.email2,
          comments: formValue.comments,
          done: true,
        };
        console.log(newData);
        const response = await folioController.update(newData);
        console.log("submit", response);

        limpiaFolioStorage();
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group grouped>
        <Form.Input
          name="name"
          placeholder="nombre"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />

        <Form.Input
          name="email2"
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          value={formik.values.email2}
          error={formik.errors.email2}
        />

        <Form.Field
          //label="Otras ciudades"
          control="textarea"
          rows="3"
          name="comments"
          placeholder="Comentarios"
          onChange={formik.handleChange}
          value={formik.values.comments}
          error={formik.errors.comments}
        />
      </Form.Group>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>
    </Form>
  );
}
