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
    conductores_con_contrato: data?.qRes?.conductores_con_contrato || "",
    conductores_que_cobran_por_servicio:
      data?.qRes?.conductores_que_cobran_por_servicio || "",

    conductores_por_unidad_de_transporte:
      data?.qRes?.conductores_por_unidad_de_transporte || "",
    dificultades_para_encontrar_conductores:
      data?.qRes?.dificultades_para_encontrar_conductores || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //firstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    //combustible: Yup.string().required("Seleccione una opcion"),
  });
}
