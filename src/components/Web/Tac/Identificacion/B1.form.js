import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    B1: data?.qRes || [],
  };
}

export function validationSchema() {
  return Yup.object({});
}
