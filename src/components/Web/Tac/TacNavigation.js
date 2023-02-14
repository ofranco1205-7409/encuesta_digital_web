import { map } from "lodash";

export class TacNavigation {
  survey = [
    {
      id: 0,
      key: "Introduccion",
      completed: false,
      active: false,
      icon: "file alternate outline",
      title: "Introducción",
      description: "",
      description_large:
        "Conocer los retos claves que enfrenta el Transport Automotor de Carga (TAC)",
      questions: ["A1", "A2"],
    },
    {
      id: 1,
      key: "Identificacion",
      completed: false,
      active: false,
      icon: "address card outline",
      title: "Identificación",
      description: "",
      description_large: "Identificar el perfil de la empresa",
      questions: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
    },
    {
      id: 2,
      key: "Operador",
      completed: false,
      active: false,
      icon: "dolly flatbed",
      title: "Operador",
      description: "",
      description_large:
        "Identificar las operaciones que realiza y los retos que enfrenta",
      questions: [
        "C1.1",
        "C1.2",
        "C1.3",
        "C1.4",
        "C1.5",
        "C1.6",
        "C1_7",
        "C1.8",
        "C1.9",
        "C2.1",
        "C2.2",
        "C3.1",
        "C3.2",
        "C4.1",
        "C4.2",
        "C4.3",
        "C4.4",
        "C5.1",
      ],
    },
    {
      id: 3,
      key: "Usuario",
      completed: false,
      active: false,
      icon: "user circle outline",
      title: "Usuario",
      description: "",
      description_large:
        "Conocer su opinión sobre algunas consideraciones particulares de cada reto",
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
    console.log("updateQuestion button", button);

    if (button === "anterior") {
      setCriteria((prev) => {
        const { sID, qIndex } = prev;
        const newCriteria = {
          ...prev,
          ...this.previous({ sID, qIndex }),
        };
        console.log("newCriteria", newCriteria);
        return newCriteria;
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

  getCurrentHeader(criteria) {
    let { sID, qIndex } = criteria;

    const header = {
      key: this.survey[sID].title,
      icon: this.survey[sID].icon,
      description_large: this.survey[sID].description_large,
    };
    return header;
  }
}
