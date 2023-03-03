import * as Yup from "yup";

export function initialValues(data) {
  //console.log(data);
  return {
    no_se_cobra: data.qRes?.no_se_cobra,
    horas_exentas: data.qRes?.horas_exentas || "",
    tarifa_hora: data.qRes?.tarifa_hora || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //C1_6: Yup.string().required("Seleccione una opcion"),
  });
}
