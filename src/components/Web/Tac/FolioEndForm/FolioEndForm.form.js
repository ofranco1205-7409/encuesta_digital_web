import * as Yup from "yup";

export function inititalValues(folio) {
  const { _id, email, email2, name, comments } = folio;
  console.log("folio", folio);
  return {
    email2: email || "",
    name: name || "",
    comments: comments || "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email("El email no es valido"),
  });
}
