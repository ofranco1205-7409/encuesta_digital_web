import * as Yup from "yup";

export function initialValues(data) {
  //console.log(data);
  return {
    C1_6: data.qRes?.C1_6 || "",
    horas_exentas: data.qRes?.horas_exentas || "",
    tarifa_hora: data.qRes?.tarifa_hora || "",
  };
}

export function validationSchema() {
  return Yup.object({
    C1_6: Yup.string().required("Seleccione una opcion"),
  });
}
