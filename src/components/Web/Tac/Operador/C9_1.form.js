import * as Yup from "yup";

export function initialValues(data) {
  console.log(data);
  return {
    C9_1: Array.isArray(data?.qRes) ? data.qRes : [],
  };
}

export function validationSchema() {
  return Yup.object({
    //B3: Yup.array().min(1).of(Yup.string().required()).required(),
  });
}
