import React, { useState } from "react";
import { Segment, Icon } from "semantic-ui-react";
import { FolioForm } from "../../../components/Web/Tac";
//import { Icon } from "../../../assets";
import "./Folio.scss";

export function Folio() {
  return (
    <div className="auth">
      <Icon name="mail" size="massive" />

      <Segment>
        <h1>Contestar encuesta</h1>
        <p>
          Agradecemos su apoyo completando la encuesta, la cual estimamos que
          tome aproximadamente 10 minutos.
        </p>
        <p>
          De manera opcional, puede dejarnos su correo electronico para enviarle
          comunicaciones de eventos y solicitudes adicionales de información
        </p>
        <FolioForm />
      </Segment>
    </div>
  );
}
