import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    C4_4: Array.isArray(data?.qRes) ? data.qRes : [],
  };
}

export function validationSchema() {
  return Yup.object({
    C4_4: Yup.array().min(1,"Seleccione almenos una opción").of(Yup.string().required()).required(),
  });
}
