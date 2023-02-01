import * as Yup from "yup";

export function initialValues(reto) {
  console.log("reto", reto);
  return {
    title: reto?.title || "",
    order: reto?.order || 1,
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required(true),
    order: Yup.number().required(true),
  });
}
