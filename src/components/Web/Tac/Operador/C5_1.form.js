import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    //C5_1: Array.isArray(data?.qRes?.C5_1) ? data.qRes : [],
    C5_1: data?.qRes?.C5_1 || [],
    otro: data?.qRes?.otro || "",
  };
}

export function validationSchema() {
  return Yup.object({
    C5_1: Yup.array().min(1,"Seleccione almenos una opción").of(Yup.string().required()).required(),
  });
}
