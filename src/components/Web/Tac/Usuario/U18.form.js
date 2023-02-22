import * as Yup from "yup";

export function initialValues(data) {
  //console.log(data);
  return {
    participa: data?.qRes?.participa || "",
    otro: data?.qRes?.otro || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //qRes: Yup.string().required("Seleccione una opcion"),
  });
}
