import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    qRes: data?.qRes || "",
  };
}

export function validationSchema() {
  return Yup.object({
    qRes: Yup.string().required("Seleccione una opcion"),
  });
}
