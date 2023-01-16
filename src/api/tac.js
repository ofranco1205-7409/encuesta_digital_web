import { ENV } from "../utils";

export class Tac {
  baseApi = ENV.BASE_API;

  async getQuestions(criteria) {
    const { folio, survey, sID, qIndex } = criteria;
    const qID = criteria.qID(survey, sID, qIndex);

    try {
      const url = `${this.baseApi}/${ENV.API_TAC_ROUTES.QUESTIONS}?folio=${folio}&qID=${qID}`;
      console.log(url);

      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      console.log(result);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createQuestion(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_TAC_ROUTES.QUESTION}`;

      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${accessToken}`,
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

  async updateQuestion(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_TAC_ROUTES.QUESTION}/${data.qID}`;

      const params = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${accessToken}`,
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
}
