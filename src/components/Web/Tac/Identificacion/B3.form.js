import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    B3: data?.qRes || [],
  };
}

export function validationSchema() {
  return Yup.object({
    B3: Yup.array().min(1,"Seleccione almenos una opción").of(Yup.string().required()).required(),
  });
}
