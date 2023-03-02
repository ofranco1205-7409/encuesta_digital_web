import * as Yup from "yup";

export function initialValues(data) {
  //console.log(data);
  return {
    C11_2: data?.qRes?.C11_2 || "",
    otro: data?.qRes?.otro || "",
  };
}

export function validationSchema() {
  return Yup.object({
    C11_2: Yup.string().required("Seleccione una opcion"),
  });
}
