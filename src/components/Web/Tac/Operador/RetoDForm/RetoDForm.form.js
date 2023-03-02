import * as Yup from "yup";

export function initialValues(reto) {
  console.log("reto", reto);
  return {
    detail: reto?.detail || [],
  };
}

export function validationSchema() {
  return Yup.object({});
}
