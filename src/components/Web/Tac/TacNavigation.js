import { map } from "lodash";
import { Tac } from "../../../api";

const tacController = new Tac();

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
      title: "Operación",
      description: "",
      description_large:
        "Identificar las operaciones que realiza y los retos que enfrenta",
      questions: [
        [
          "C1.1",
          "C1.2",
          "C1.3",
          "C1.4",
          "C1.5",
          "C1.6",
          "C1.7",
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
          "C5.2",
          "C6",
          "C7.1",
          "C7.2",
          "C7.3",
          "C8",
          "C9.1",
          "C9.2",
          "C10",
          "C11.1",
          "C11.2",
          "C12",
          "D",
        ],
        [
          "U1",
          "U2",
          "U3",
          "U4",
          "U5",
          "U6",
          "U7",
          "U8",
          "U9",
          "U10",
          "U11",
          "U12",
          "U13",
          "U14",
          "U15",
          "U16",
          "U17",
          "U18",
        ],
        ["END"],
      ],
    },
  ];

  /*
  survey_usuario = [
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
      questions: [
        "U1",
        "U2",
        "U3",
        "U4",
        "U5",
        "U6",
        "U7",
        "U8",
        "U9",
        "U10",
        "U11",
        "U12",
        "U13",
        "U14",
        "U15",
        "U16",
        "U17",
        "U18",
      ],
    },
  ];

  survey_operador = [
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
        "C1.7",
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
        "C5.2",
        "C6",
        "C7.1",
        "C7.2",
        "C7.3",
        "C8",
        "C9.1",
        "C9.2",
        "C10",
        "C11.1",
        "C11.2",
        "C12",
        "D",
      ],
    },
  ];
*/
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

  getCriteriaIni(folio) {
    const sID_ini = 0;
    const qIndex_ini = 0;
    const iOperUser_ini = 0;
    const qID_ini =
      sID_ini === 2
        ? this.survey[sID_ini].questions[iOperUser_ini][qIndex_ini]
        : this.survey[sID_ini].questions[qIndex_ini];

    const criteriaIni = {
      folio: folio._id,
      sID: sID_ini,
      qIndex: qIndex_ini,
      qID: qID_ini,
      iOperUser: iOperUser_ini,
    };

    return criteriaIni;
  }

  /**
   *
   * @param q = {sID, qIndex}
   * @returns {sID, qIndex}
   */
  next(criteria) {
    let { folio, sID, qIndex, iOperUser } = criteria;

    console.log("next ini criteria", criteria);

    qIndex++;

    if (sID === 2) {
      //Parte 3
      if (qIndex > this.survey[sID].questions[iOperUser].length - 1) {
        //TODO: Redirigir a pantalla final
        console.error("No hay mas preguntas");
        //iOperUser = 2;
        //qIndex = this.survey[sID].questions[iOperUser].length;
        sID = 3;
        qIndex = 0;
      }
    } else {
      //parte 1 y2
      if (qIndex > this.survey[sID].questions.length - 1) {
        sID++;
        qIndex = 0;
      }
    }

    const newQuestion = {
      sID,
      qIndex,
      //qID: this.qID({ sID, qIndex }),
      qID:
        sID === 3
          ? "END"
          : sID === 2
          ? this.survey[sID].questions[iOperUser][qIndex]
          : this.survey[sID].questions[qIndex],
    };
    console.log("next fin", newQuestion);
    return newQuestion;
  }

  /**
   *
   * @param question = {sID, qIndex}
   * @returns {sID, qIndex}
   */
  previous(criteria) {
    let { sID, qIndex, iOperUser } = criteria;

    console.log("previous ini", criteria);

    qIndex--;
    /*
    if (qIndex < 0) {
      if (sID > 0) {
        if (sID === 2) {
          sID = 2;
          qIndex = 0;
        } else {
          sID--;
          qIndex = this.survey[sID].questions[iOpeUser].length - 1;
        }
      } else {
        sID = 0;
        qIndex = 0;
      }
    }*/
    if (qIndex < 0) {
      qIndex = 0;
    }

    const newQuestion = {
      sID,
      qIndex,
      //qID: this.qID({ sID, qIndex }),
      qID:
        sID === 2
          ? this.survey[sID].questions[iOperUser][qIndex]
          : this.survey[sID].questions[qIndex],
    };
    console.log("previous fin", newQuestion);
    return newQuestion;
  }

  updateQuestion(button, setCriteria, iOperUser) {
    console.log("updateQuestion", button, iOperUser);

    if (button === "anterior") {
      setCriteria((prev) => {
        //const {folio,  sID, qIndex } = prev;
        const newCriteria = {
          ...prev,
          ...this.previous(prev),
          iOpeUser: iOperUser ? iOperUser : 0,
        };
        console.log("newCriteria", newCriteria);
        return newCriteria;
      });
    } else if (button === "siguiente") {
      setCriteria((prev) => {
        //const { sID, qIndex } = prev;
        const newCriteria = {
          ...prev,
          ...this.next(prev),
          iOperUser:
            typeof iOperUser === "undefined" ? prev.iOperUser : iOperUser,
        };
        console.log("newCriteria", newCriteria);
        return newCriteria;
      });
    }
  }

  getProgress(criteria) {
    let { sID, qIndex, iOperUser } = criteria;

    const progress = {
      value: qIndex + 1,
      total:
        sID === 2
          ? this.survey[sID].questions[iOperUser].length
          : this.survey[sID].questions.length,
    };
    return progress;
  }

  getCurrentHeader(criteria) {
    let { sID } = criteria;

    sID = sID > 2 ? 2 : sID;
    const header = {
      key: this.survey[sID].title,
      icon: this.survey[sID].icon,
      description_large: this.survey[sID].description_large,
    };
    return header;
  }
}
