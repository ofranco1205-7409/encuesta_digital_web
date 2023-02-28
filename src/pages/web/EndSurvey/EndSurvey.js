import React, { useState } from "react";
import { useFolio } from "../../../hooks";
import { Segment, Icon, Divider, Header } from "semantic-ui-react";
import { FolioEndForm, FolioForm } from "../../../components/Web/Tac";
//import { Icon } from "../../../assets";
import "./EndSurvey.scss";

export function EndSurvey() {
  const { folio } = useFolio();

  return (
    <div className="endSurvey">
      <Icon name="mail" size="massive" />

      <Segment>
        <h1>Encuesta terminada</h1>
        <Divider></Divider>

        <h3>Nuevamente, le agradecemos el apoyo brindado !</h3>
        <p>
          De manera opcional, puede dejarnos su nombre y correo electronico para
          enviarle comunicaciones de eventos y solicitudes adicionales de
          información.
        </p>
        <FolioEndForm />
      </Segment>
    </div>
  );
}
