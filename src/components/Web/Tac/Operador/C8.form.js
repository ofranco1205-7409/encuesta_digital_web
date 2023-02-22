import * as Yup from "yup";

export function initialValues(data) {
  //console.log("initialValues", data.qRes);
  return {
    C8_1: data?.qRes?.C8_1 || "",
    C8_2: data?.qRes?.C8_2 || "",
    C8_3: data?.qRes?.C8_3 || "",
    C8_4: data?.qRes?.C8_4 || "",
    C8_5: data?.qRes?.C8_5 || "",
    C8_6: data?.qRes?.C8_6 || "",
  };
}

export function validationSchema() {
  return Yup.object({
    //firstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    //combustible: Yup.string().required("Seleccione una opcion"),
  });
}
