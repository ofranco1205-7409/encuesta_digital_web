import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Button,
  Divider,
  Form,
  Header,
  Icon,
  Loader,
  Segment,
} from "semantic-ui-react";
import { size, map } from "lodash";
import { useFormik, Field } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./D.form";
import { NavigationButtons } from "../NavigationButtons";
import { RetoDItem } from "./RetoDItem";
import "./D.scss";
//import { BasicModal } from "../../../Shared";
//import { RetoForm } from "./RetoForm";
import { TacNavigation } from "../TacNavigation";
import { BasicModal } from "../../../Shared";

const tacController = new Tac();
const tn = new TacNavigation();

const initialRetos = [
  {
    title: "{1} Mercado de servicio y precios",
    order: 1,
    detailArr: [
      "Demanda irregular",
      "Baja demanda",
      "No hay carga de retorno",
      "Bajo precio del servicio de transporte",
      "Excesivo número de competidores",
      "Usuarios demasiado exigentes",
    ],
    detail: [],
  },
  {
    title: "{2} Altos costos operativos",
    order: 2,
    detailArr: [
      "Precio de combustibles",
      "Costos de personal",
      "Averías",
      "Accidentes",
      "Gastos en seguridad",
    ],
    detail: [],
  },
  {
    title: "{3} Modelo de gestión empresarial deficiente",
    order: 3,
    detailArr: [
      "Ausencia de un esquema contable formal",
      "Servicios sin contrato",
      "Comercialización indirecta a través de sindicato u empresas formales",
      "Dificultades para cobrar a los usuarios",
      "Baja digitalización/desconexión con sistemas de compras de los usuarios",
      "Dificultad para adaptar la flota a energías verdes",
    ],
    detail: [],
  },
  {
    title: "{4} Dificultades operacionales",
    order: 4,
    detailArr: [
      "Tiempos de carga y descarga ineficientes",
      "Falta de áreas de servicios y pernocta segura",
      "Baja utilización de capacidad de carga",
      "Flota inadecuada a la demanda",
      "Restricciones de acceso a las ciudades/desvíos",
    ],
    detail: [],
  },
  {
    title: "{5} Modelo de gestión de personal",
    order: 5,
    detailArr: [
      "Falta de conductores",
      "Necesidad de incorporar mujeres a las operaciones",
      "Falta de conocimientos/capacitación",
      "Falta de cursos de capacitación",
    ],
    detail: [],
  },
  {
    title: "{6} Dificultades de financiación",
    order: 6,
    detailArr: ["Financiación de la flota", "Financiación de las operaciones"],
    detail: [],
  },
  {
    title: "{7} Problemas con el Sector Público",
    order: 7,
    detailArr: [
      "Excesiva cantidad de regulaciones y fiscalización",
      "Pago de tasas e impuestos elevados",
      "Prácticas corruptas",
      "Desinterés de la Administración Pública por el sector",
      "Exigencia de certificaciones",
    ],
    detail: [],
  },
  {
    title: "{8} Bajo prestigio profesional del TAC entre la población",
    order: 8,
    detailArr: [],
    detail: [],
  },
  {
    title: "{9} Riesgos de seguridad en el recorrido",
    order: 9,
    detailArr: [],
    detail: [],
  },
  {
    title: "{10} Otros (especifique cuáles)",
    order: 10,
    detailArr: [],
    detail: [],
  },
];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return map(result, (reto, i) => ({ ...reto, order: i + 1 }));
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  //padding: grid * 2,
  //margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  //background: isDragging ? "#4a9af5" : "whitesmoke",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export function D(props) {
  //const [tasks, setTasks] = useState(initialRetos);
  const [retos, setRetos] = useState(null);

  const [showModal, setShowModal] = useState(false);
  //const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  //const onReload = () => setReload((prevStata) => !prevStata);

  const { criteria, setCriteria, qData } = props;
  const { folio, sID } = criteria;
  const [button, setButton] = useState(null);

  console.log("qData", qData);

  const formik = useFormik({
    initialValues: initialValues(retos),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formValue", formValue);
      try {
        const newData = {
          folio: folio,
          qID: qData.qID,
          qRes: retos,
        };
        console.log("newData", newData);

        await tacController.updateQuestion(newData);

        tn.updateQuestion(button, setCriteria);
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        setRetos(null);
        const response = await tacController.getQuestions(qData);
        console.log("response", response);
        console.log("response[0]", response[0]);
        if (response[0]) {
          setRetos(response[0].qRes);
        } else {
          setRetos(initialRetos);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  console.log("retos", retos);
  if (!retos) return <Loader active inline="centered" />;
  if (size(retos) === 0) return <h4>[No se ha capturado ningun reto...]</h4>;

  return (
    <>
      <div className="d">
        <DragDropContext
          onDragEnd={(result) => {
            const { source, destination } = result;
            if (!destination) {
              return;
            }
            if (
              source.index === destination.index &&
              source.droppableId === destination.droppableId
            ) {
              return;
            }

            setRetos((prevRetos) =>
              reorder(prevRetos, source.index, destination.index)
            );
          }}
        >
          <div className="d__retos">
            <Header as="h3" dividing>
              <Header.Content>
                D.- Ordene de mayor a menor sus 10 principales desafios (1 es el
                más importante)
              </Header.Content>
              <Header.Subheader>
                Ordene de más a menos importante los 10 principales desafios
              </Header.Subheader>
            </Header>

            <Droppable droppableId="tasks">
              {(droppableProvided) => (
                <ul
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                  className="d__retos__task-container"
                >
                  {retos.map((reto, index) => {
                    //console.log("reto", reto);
                    return (
                      <Draggable
                        key={reto.order.toString()}
                        draggableId={reto.order.toString()}
                        index={index}
                      >
                        {(draggableProvided, snapshot) => (
                          <li
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                            className="d__retos__task-container__task-item"
                            style={getItemStyle(
                              snapshot.isDragging,
                              draggableProvided.draggableProps.style
                            )}
                          >
                            <RetoDItem
                              key={reto.order}
                              reto={reto}
                              //onReload={onReload}
                              qData={qData}
                            />
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {droppableProvided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </DragDropContext>
        <p />
        <Divider />
        <Form onSubmit={formik.handleSubmit}>
          <NavigationButtons
            setButton={setButton}
            formik={formik}
            progress={tn.getProgress(criteria)}
          />
        </Form>
      </div>
    </>
  );
}
