import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    //C5_1: Array.isArray(data?.qRes?.C5_1) ? data.qRes : [],
    U13: Array.isArray(data?.qRes) ? data?.qRes : [],
  };
}

export function validationSchema() {
  return Yup.object({
    U13: Yup.array()
      .min(1, "Seleccione almenos una opción")
      .of(Yup.string().required())
      .required(),
  });
}
