import { map } from "lodash";

export class TacNavigation {
  survey = [
    {
      id: 0,
      key: "Introduccion",
      completed: false,
      active: false,
      icon: "truck",
      title: "Introduccion",
      description: "Choose your shipping options",
      questions: ["A1", "A2"],
    },
    {
      id: 1,
      key: "Identificacion",
      completed: false,
      active: false,
      icon: "payment",
      title: "Identificacion",
      description: "Enter billing information",
      questions: ["B1", "B2", "B3", "B4"],
    },
    {
      id: 2,
      key: "Operador",
      completed: false,
      active: false,
      icon: "truck",
      title: "Operador",
      description: "Enter billing information",
      questions: ["C1_1", "C1_2", "C1_3", "C1_4"],
    },
    {
      id: 3,
      key: "Usuario",
      completed: false,
      active: false,
      icon: "user",
      title: "Usuario",
      description: "Enter billing information",
      questions: ["D1"],
    },
  ];

  /**
   *
   * @param {*} criteria
   * @returns
   */
  updateSteps(criteria) {
    let { sID, qIndex } = criteria;

    return map(this.survey, (seccion) => {
      seccion.active = seccion.id === sID;
      seccion.completed = seccion.id < sID; //sComplete[seccion.id];
      return seccion;
    });
  }

  /**
   *
   * @param {*} sID
   * @param {*} qIndex
   * @returns Identificador qID del sID y qIndex dado
   */
  qID(question) {
    const { sID, qIndex } = question;

    console.log("question", question);

    const qID = this.survey[sID].questions[qIndex];
    console.log("qID", qID);

    return qID;
  }

  /**
   *
   * @param q = {sID, qIndex}
   * @returns {sID, qIndex}
   */
  next(question) {
    let { sID, qIndex } = question;
    console.log("next ini", question);

    qIndex++;
    if (qIndex > this.survey[sID].questions.length - 1) {
      if (sID < this.survey.length - 1) {
        sID++;
        qIndex = 0;
      } else {
        console.error("No hay mas preguntas");
      }
    }

    const newQuestion = {
      sID,
      qIndex,
      qID: this.qID({ sID, qIndex }),
    };
    console.log("next fin", newQuestion);
    return newQuestion;
  }

  /**
   *
   * @param question = {sID, qIndex}
   * @returns {sID, qIndex}
   */
  previous(question) {
    let { sID, qIndex } = question;
    console.log("previous ini", question);

    qIndex--;
    if (qIndex < 0) {
      if (sID > 0) {
        sID--;
        qIndex = this.survey[sID].questions.length - 1;
      } else {
        sID = 0;
        qIndex = 0;
      }
    }

    const newQuestion = {
      sID,
      qIndex,
      qID: this.qID({ sID, qIndex }),
    };
    console.log("previous fin", newQuestion);
    return newQuestion;
  }

  updateQuestion(button, setCriteria) {
    console.log("button", button);

    if (button === "anterior") {
      setCriteria((prev) => {
        const { sID, qIndex } = prev;
        return {
          ...prev,
          ...this.previous({ sID, qIndex }),
        };
      });
    } else if (button === "siguiente") {
      setCriteria((prev) => {
        const { sID, qIndex } = prev;
        return {
          ...prev,
          ...this.next({ sID, qIndex }),
        };
      });
    }
  }

  getProgress(criteria) {
    let { sID, qIndex } = criteria;

    const progress = {
      value: qIndex + 1,
      total: this.survey[sID].questions.length,
    };
    return progress;
  }
}
