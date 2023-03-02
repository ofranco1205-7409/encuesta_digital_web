import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    B1: data?.qRes || [],
  };
}

export function validationSchema() {
  //return Yup.object({});
  return Yup.object().shape({
    B1: Yup.array().min(1,"Seleccione almenos una opción"),
  });
}
