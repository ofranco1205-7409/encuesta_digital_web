import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    importaciones: data?.importaciones || "",
    exportaciones: data?.exportaciones || "",
    almacenista: data?.almacenista || "",
    agente_de_carga: data?.agente_de_carga || "",
    agente_de_aduanas: data?.agente_de_aduanas || "",
    agente_naviero_consignatario: data?.agente_naviero_consignatario || "",
  };
}

export function validationSchema() {
  return Yup.object({});
}
