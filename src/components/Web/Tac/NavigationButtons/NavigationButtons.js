import React from "react";
import { Divider, Form, Progress, Segment } from "semantic-ui-react";
import "./NavigationButtons.scss";

export function NavigationButtons(props) {
  const { setButton, formik, progress } = props;

  /*
  const onClickHandler = (navigation, handler) => {
    console.log("navigation", navigation);
    setButton(navigation);
    if (handler) {
      handler();
    } else {
      console.log("Sin handler");
    }
  };
*/

  return (
    <div className="navigation-buttons">
      <Form.Button
        type="submit"
        value="anterior"
        secondary
        loading={formik.isSubmitting}
        onClick={() => {
          setButton("anterior");
        }}
      >
        Anterior
      </Form.Button>

      <Form.Button
        type="submit"
        value="siguiente"
        primary
        fluid
        loading={formik.isSubmitting}
        onClick={() => {
          setButton("siguiente");
        }}
      >
        Siguiente
      </Form.Button>

      <div className="navigation-buttons__progress-bar">
        <Progress
          value={progress ? progress.value : 0}
          total={progress ? progress.total : 0}
          progress="ratio"
          size="medium"
          color="grey"
        ></Progress>
      </div>
    </div>
  );
}
