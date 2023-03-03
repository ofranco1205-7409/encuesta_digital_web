import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    importaciones: data?.importaciones || "",
    exportaciones: data?.exportaciones || "",
    distribucion_nacional: data?.distribucion_nacional || "",
    servicio_centro_acopio: data?.servicio_centro_acopio || "",
    distribucion_urbana: data?.distribucion_urbana || "",
    otros: data?.otros || "",
    otro_detalle: data?.otro_detalle || "",
  };
}

export function validationSchema() {
  return Yup.object({});
}
