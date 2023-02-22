import * as Yup from "yup";

export function initialValues(data) {
  //console.log("initialValues", data.qRes);
  return {
    transporte: data?.qRes?.transporte || "",
    almacenamiento: data?.qRes?.almacenamiento || "",
    gestion_logistica: data.qRes?.gestion_logistica || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //firstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    //combustible: Yup.string().required("Seleccione una opcion"),
  });
}
