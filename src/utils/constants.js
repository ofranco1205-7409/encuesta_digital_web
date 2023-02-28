//Local cambiar a http
const SERVER_IP = "localhost:3977";

//Para PRD cambiar a https
//const SERVER_IP = "ofg-app1.herokuapp.com";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api/v1`,
  API_ROUTES: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
    USER_ME: "user/me",
    USER: "user",
    USERS: "users",
    MENU: "menu",
    COURSE: "course",
    NEWSLETTER: "newsletter",
    POST: "post",
  },
  API_TAC_ROUTES: {
    QUESTION: "question",
    QUESTIONS: "questions",
    FOLIO: "folio",
    F_ENCODE: "folio/encode",
    F_DECODE: "folio/decode",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
    F_TOKEN: "fToken",
    I_OPER_USER: "iOperUser",
  },
};
