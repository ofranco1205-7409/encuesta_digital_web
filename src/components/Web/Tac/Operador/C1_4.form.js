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
    combustible: data?.qRes?.combustible || "",
    personal_conduccion: data?.qRes?.personal_conduccion || "",
    administrativos_y_servicio_cliente:
      data.qRes?.administrativos_y_servicio_cliente || "",
    comerciales: data.qRes?.comerciales || "",
    financieros_pago_deuda: data.qRes?.financieros_pago_deuda || "",
    seguros: data.qRes?.seguros || "",
    impuestos: data.qRes?.impuestos || "",
    depreciacion_flota_y_otros_activos:
      data.qRes?.depreciacion_flota_y_otros_activos || "",
    costos_ambientales: data.qRes?.costos_ambientales || "",
    capacitacion: data.qRes?.capacitacion || "",
    alquileres_hipotecas: data.qRes?.alquileres_hipotecas || "",
    vigilancia_seguridad: data.qRes?.vigilancia_seguridad || "",
    tiempos_muertos: data.qRes?.tiempos_muertos || "",
    viaticos_estancias: data.qRes?.viaticos_estancias || "",
    otros: data.qRes?.otros || "",
    otros_costos: data.qRes?.otros_costos || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //firstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    //combustible: Yup.string().required("Seleccione una opcion"),
  });
}
