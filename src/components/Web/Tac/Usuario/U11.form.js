import * as Yup from "yup";

export function initialValues(data) {
  //console.log("initialValues", data.qRes);
  return {
    km_recorridos: data?.qRes?.km_recorridos || "",
    U11: data?.qRes?.U11 || false,
  };
}

export function validationSchema() {
  return Yup.object({
    //firstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    //combustible: Yup.string().required("Seleccione una opcion"),
  });
}
