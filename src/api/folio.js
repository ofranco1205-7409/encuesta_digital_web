import { ENV } from "../utils";

export class Folio {
  baseApi = ENV.BASE_API;

  async create(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_TAC_ROUTES.FOLIO}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  //Equivalente a getMe
  async decode(fToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_TAC_ROUTES.F_DECODE}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${fToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  //Equivalente a login
  async encode(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_TAC_ROUTES.F_ENCODE}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  setFolioStorage(fTtoken) {
    localStorage.setItem(ENV.JWT.F_TOKEN, fTtoken);
  }

  getFolioStorage() {
    return localStorage.getItem(ENV.JWT.F_TOKEN);
  }

  removeFolioStorage() {
    localStorage.removeItem(ENV.JWT.FOLIO);
  }
}
