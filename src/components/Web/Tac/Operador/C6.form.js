import * as Yup from "yup";

export function initialValues(retos) {
  console.log("retos", retos);
  return {
    retos: retos || [],
  };
}

export function validationSchema() {
  return Yup.object({});
}
