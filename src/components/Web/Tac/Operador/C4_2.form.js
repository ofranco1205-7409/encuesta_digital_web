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
    C4_2_1: data?.qRes?.C4_2_1 || "",
    C4_2: data?.qRes?.C4_2 || false,
  };
}

export function validationSchema() {
  return Yup.object({
    //firstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    //combustible: Yup.string().required("Seleccione una opcion"),
  });
}
