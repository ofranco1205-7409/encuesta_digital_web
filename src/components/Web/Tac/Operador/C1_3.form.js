import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    C1_3: data.qRes?.C1_3 || [],
    otro: data.qRes?.otro || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //B3: Yup.array().min(1).of(Yup.string().required()).required(),
  });
}