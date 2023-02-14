import * as Yup from "yup";

export function initialValues(data) {
  /*
  const data = {
    combustible: "",
    personal_conduccion: "",
    administrativos_y_servicio_cliente: "",
    comerciales: "",
    financieros_pago_deuda: "",
    seguros: "",
    impuestos: "",
    depreciacion_flota_y_otros_activos: "",
    costos_ambientales: "",
    capacitacion: "",
    alquileres_hipotecas: "",
    vigilancia_seguridad: "",
    tiempos_muertos: "",
    viaticos_estancias: "",
    otros: "",
  }; */
  //console.log("initialValues", data.qRes);
  return {
    C4_1_1A: data?.qRes?.C4_1_1A || "",
    C4_1_1B: data?.qRes?.C4_1_1B || "",
    C4_1_2A: data?.qRes?.C4_1_2A || "",
    C4_1_2B: data?.qRes?.C4_1_2B || "",
    C4_1_3A: data?.qRes?.C4_1_3A || "",
    C4_1_3B: data?.qRes?.C4_1_3B || "",
    C4_1_4A: data?.qRes?.C4_1_4A || "",
    C4_1_4B: data?.qRes?.C4_1_4B || "",
    C4_1_5A: data?.qRes?.C4_1_5A || "",
    C4_1_5B: data?.qRes?.C4_1_5B || "",
    C4_1_6A: data?.qRes?.C4_1_6A || "",
    C4_1_6B: data?.qRes?.C4_1_6B || "",
    C4_1_7A: data?.qRes?.C4_1_7A || "",
    C4_1_7B: data?.qRes?.C4_1_7B || "",
    C4_1_8A: data?.qRes?.C4_1_8A || "",
    C4_1_8B: data?.qRes?.C4_1_8B || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //firstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    //combustible: Yup.string().required("Seleccione una opcion"),
  });
}
