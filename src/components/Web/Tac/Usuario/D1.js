import { Checkbox } from "semantic-ui-react";

export function D1() {
  return (
    <>
      <h2>
        D1. Ordene de más a menos importante los siguientes retos claves para el
        Transporte Automotor de Carga (TAC)
      </h2>
      <Checkbox label="Reto 1. La empresarialización del sector y la persistencia de la informalidad y la atomización" />{" "}
      <br />
      <Checkbox label="Reto 2. Las condiciones de trabajo en el sector (envejecimiento, escasez de MdO, desprotección)" />{" "}
      <br />
      <Checkbox label="Reto 3. Las barreras de inclusión y la equidad de género en el TAC" />{" "}
    </>
  );
}
