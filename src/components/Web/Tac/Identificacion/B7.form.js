import * as Yup from "yup";

export function initialValues(data) {
  console.log("data", data);
  return {
    pais: data?.pais || "",
    estado: data?.estado || "",
    ciudad: data?.ciudad || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //qRes: Yup.string().required("Seleccione una opcion"),
  });
}
