import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    U8: data?.qRes?.U8 || "",
    otro: data?.qRes?.otro || "",
  };
}

export function validationSchema() {
  return Yup.object({
    U8: Yup.array()
      .min(1, "Seleccione almenos una opción")
      .of(Yup.string().required())
      .required(),
  });
}
