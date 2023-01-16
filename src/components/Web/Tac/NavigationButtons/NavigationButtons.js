import React from "react";
import { Form } from "semantic-ui-react";
import "./NavigationButtons.scss";

export function NavigationButtons(props) {
  const { setButton, formik } = props;

  return (
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
        Anterior
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
        Siguiente
      </Form.Button>
    </div>
  );
}
