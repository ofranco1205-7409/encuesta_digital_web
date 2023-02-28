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
          name: data.name,
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

  async update(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_TAC_ROUTES.FOLIO}`;
      const params = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        /*
          {
          _id: data.folio,
          email: data.email,
          email2: data.email2,
          name: data.name,
          comments: data.comments,
          done: data.done,
        }),
        */
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca folio en DB (equivalente a getMe)
   * @param {*} fToken
   * @returns
   */
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

  /**
   * Busca folio en DB (equivalente a login)
   * @param {*} fToken
   * @returns
   */
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

  /**
   *Salva Folio token en local storage
   */
  setFolioStorage(fTtoken) {
    localStorage.setItem(ENV.JWT.F_TOKEN, fTtoken);
  }

  /**
   *Recupera Folio token en local storage
   */

  getFolioStorage() {
    return localStorage.getItem(ENV.JWT.F_TOKEN);
  }

  /**
   *Elimina Folio token de local storage
   */
  removeFolioStorage() {
    localStorage.removeItem(ENV.JWT.F_TOKEN);
  }
}
