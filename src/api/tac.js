import { ENV } from "../utils";
import { map } from "lodash";

export class Tac {
  baseApi = ENV.BASE_API;

  /**
   *
   * @param  qData  { folio, qID }
   * @returns
   */
  async getQuestions(qData) {
    const { folio, qID } = qData;

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

      console.log(result);
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

      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateRetos(qData, newReto, deleteOrder, operacion) {
    console.log("qData", qData);
    console.log("newReto", newReto);
    console.log("deleteOrder", deleteOrder);
    console.log("operacion", operacion);
    const { folio, qID } = qData;

    const questions = await this.getQuestions(qData);

    let retos = null;
    if (questions[0]) {
      retos = questions[0].qRes;
    }

    let newRetos = !retos ? new Array() : [...retos];
    switch (operacion) {
      case "I":
        newRetos.splice(newReto.order - 1, 0, newReto);
        break;
      case "U":
        newRetos.splice(deleteOrder - 1, 1);
        newRetos.splice(newReto.order - 1, 0, newReto);
        break;
      case "D":
        newRetos.splice(deleteOrder - 1, 1);
        break;
      default:
        break;
    }

    console.log("newRetos", newRetos);
    await this.updateQuestion({
      folio,
      qID,
      qRes: map(newRetos, (reto, i) => ({ ...reto, order: i + 1 })),
    });
  }
}
