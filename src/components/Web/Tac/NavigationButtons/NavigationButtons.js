import React from "react";
import { Form, Progress } from "semantic-ui-react";
import "./NavigationButtons.scss";

export function NavigationButtons(props) {
  const { setButton, formik } = props;

  return (
    <div className="navigation-buttons">
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
      <div className="navigation-buttons__progress-bar">
        <Progress value="1" total="8" size="tiny" color="grey">
          1/8
        </Progress>
      </div>
    </div>
  );
}
