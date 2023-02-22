import * as Yup from "yup";

export function initialValues(data) {
  //console.log("initialValues", data.qRes);
  return {
    insumos_importados: data?.qRes?.insumos_importados || "",
    produccion_exportada: data?.qRes?.produccion_exportada || "",
    mercado_domestico: data.qRes?.mercado_domestico || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //firstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    //combustible: Yup.string().required("Seleccione una opcion"),
  });
}
