import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    U7: Array.isArray(data?.qRes) ? data.qRes : [],
  };
}

export function validationSchema() {
  return Yup.object({
    U7: Yup.array()
      .min(1, "Seleccione almenos una opción")
      .of(Yup.string().required())
      .required(),
  });
}
