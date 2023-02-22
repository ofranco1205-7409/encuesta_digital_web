import * as Yup from "yup";

export function initialValues(data) {
  //console.log("initialValues", data.qRes);
  return {
    distribucion: data?.qRes?.distribucion || "",
    aduanas: data?.qRes?.aduanas || "",
    administrativos_y_servicio_cliente:
      data.qRes?.administrativos_y_servicio_cliente || "",
    comerciales: data.qRes?.comerciales || "",
    seguros_a_carga: data.qRes?.seguros_a_carga || "",
    impuestos: data.qRes?.impuestos || "",
    depreciacion_activos: data.qRes?.depreciacion_activos || "",
    empaquetado_etiquetado: data.qRes?.empaquetado_etiquetado || "",
    abastecimiento: data.qRes?.abastecimiento || "",
    logistica_inversa: data.qRes?.logistica_inversa || "",
    combustible: data.qRes?.combustible || "",
    laborales: data.qRes?.laborales || "",
    almacenamiento_picking: data.qRes?.almacenamiento_picking || "",
    gestion_compras: data.qRes?.gestion_compras || "",
    reciclaje: data.qRes?.reciclaje || "",
    costos_ambientales: data.qRes?.costos_ambientales || "",
    capacitación: data.qRes?.capacitación || "",
    alquileres_hipotecas: data.qRes?.alquileres_hipotecas || "",
    vigilancia_seguridad: data.qRes?.vigilancia_seguridad || "",
    tiempos_muertos: data.qRes?.tiempos_muertos || "",
    viaticos_estancias: data.qRes?.viaticos_estancias || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //firstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    //combustible: Yup.string().required("Seleccione una opcion"),
  });
}
