import * as Yup from "yup";

export function initialValues(data) {
  console.log("data.qRes", data.qRes);
  return {
    C1_7: data?.qRes?.C1_7 || "",
    otro: data?.qRes?.otro || "",
  };
}

export function validationSchema() {
  return Yup.object({
    C1_7: Yup.string().required("Seleccione una opcion"),
  });
}
