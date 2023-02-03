import React from "react";
import { Container, Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "./TacBanner.scss";

export function TacBanner() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("click");
    navigate("/tac");
  };
  return (
    <div className="Tacbanner">
      <div className="Tacbanner__dark" />
      <div className="Tacbanner__text">
        <h2>Estimado colaborador (a):</h2>
        <p>
          Esta encuesta busca determinar la estructura operativa y
          condicionantes de funcionamiento de los operadores y usuarios de
          Sector de Transporte Automotor de Carga (TAC) en América Latina y el
          Caribe (ALC). Esto permitirá comprender las necesidades de
          digitalización en los procesos de gestión de la mercancía y trámites
          asociados. La encuesta se realiza como parte del Bien Público Regional
          DIGITAC-HUB, bajo la dirección del Banco Interamericano de Desarrollo
          y la ejecución de la empresa TDR.
        </p>
        <p>
          <strong>Cobertura Geográfica:</strong> La encuesta se aplica a los
          operadores y usuarios TAC en los seis países que conforman el
          DIGITAC-HUB (Brasil, Costa Rica, Ecuador, El Salvador, México y
          República Dominicana).
        </p>
        <p>
          <strong>Política de privacidad:</strong> Los administradores de la
          encuesta afimamos nuestro compromiso con la protección de los datos
          suministrados, en especial la información identificativa de los
          participantes. Se considera información identificativa cualquier
          elemento de datos que permita la identificación del encuestado (ej.,
          nombre de la empresa, datos de contacto, etc.). Toda la información
          recabada será manejada con la debida confidencialidad. Los encuestados
          no serán identificados por nombre (individual o de su empresa) en
          ningún reporte de carácter público. Los resultados siempre serán
          presentados en forma agregada, y sus respuestas serán analizadas en
          combinación con las de otros participantes. Sus respuestas serán
          almacenadas en una base de datos con acceso protegido, a la cual sólo
          tendrán acceso personas con la debida autorización y sujetas a las
          políticas de confidencialidad de la entidad ejecutora. Ninguna persona
          ajena al proyecto podrá solicitar información en representación
          nuestra o haciendo referencia al mismo. Finalmente, los datos no serán
          utilizados para ningún fin ajeno al indicado en la sección precedente,
          y la información que sea publicada será de acceso libre y equitativo a
          todos los participantes.
        </p>
        <p>
          <strong>Contacto:</strong> En caso de cualquier ambigüedad o duda que
          surja durante la aplicación de esta encuesta, o si tiene alguna
          consulta sobre el manejo o integridad de los datos contenidos en la
          misma, sírvase contactarnos a encuestas@tdr.com.ve.
        </p>
        <p />
      </div>
      <div className="Tacbanner__button">
        <div className="Tacbanner__button__encuesta">
          <Button primary size="big" onClick={handleClick}>
            <Icon name="angle double right" /> &nbsp;&nbsp;Ir a la encuesta
          </Button>
        </div>
      </div>
    </div>
  );
}
