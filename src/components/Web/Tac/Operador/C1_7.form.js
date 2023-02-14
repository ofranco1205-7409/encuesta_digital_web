import * as Yup from "yup";

export function initialValues(data) {
  console.log("data.qRes", data.qRes);
  return {
    organizacion: data?.qRes?.organizacion || "",
    otra_organizacion: data?.qRes?.otra_organizacion || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //qRes: Yup.string().required("Seleccione una opcion"),
  });
}
