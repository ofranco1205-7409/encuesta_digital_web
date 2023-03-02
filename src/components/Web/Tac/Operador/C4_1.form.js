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
    A1: data?.qRes?.A1 || "",
    B1: data?.qRes?.B1 || "",
    A2: data?.qRes?.A2 || "",
    B2: data?.qRes?.B2 || "",
    A3: data?.qRes?.A3 || "",
    B3: data?.qRes?.B3 || "",
    A4: data?.qRes?.A4 || "",
    B4: data?.qRes?.B4 || "",
    A5: data?.qRes?.A5 || "",
    B5: data?.qRes?.B5 || "",
    A6: data?.qRes?.A6 || "",
    B6: data?.qRes?.B6 || "",
    A7: data?.qRes?.A7 || "",
    B7: data?.qRes?.B7 || "",
    A8: data?.qRes?.A8 || "",
    B8: data?.qRes?.B8 || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //firstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    //combustible: Yup.string().required("Seleccione una opcion"),
  });
}
