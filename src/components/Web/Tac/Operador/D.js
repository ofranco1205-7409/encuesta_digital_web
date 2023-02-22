import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Divider, Form, Header, Loader, Segment } from "semantic-ui-react";
import { size, map } from "lodash";
import { useFormik, Field } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./D.form";
import { NavigationButtons } from "../NavigationButtons";
import "./D.scss";
//import { BasicModal } from "../../../Shared";
//import { RetoForm } from "./RetoForm";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

const initialRetos = [
  {
    title: "{1} Mercado de servicio y precios",
    order: 1,
  },
  {
    title: "{2} Altos costos operativos",
    order: 2,
  },
  {
    title: "{3} Modelo de gestión empresarial deficiente",
    order: 3,
  },
  {
    title: "{4} Dificultades operacionales",
    order: 4,
  },
  {
    title: "{5} Modelo de gestión de personal",
    order: 5,
  },
  {
    title: "{6} Dificultades de financiación",
    order: 6,
  },
  {
    title: "{7} Problemas con el Sector Público",
    order: 7,
  },
  {
    title: "{8} Bajo prestigio profesional del TAC entre la población",
    order: 8,
  },
  {
    title: "{9} Riesgos de seguridad en el recorrido",
    order: 9,
  },
  {
    title: "{10} Otros (especifique cuáles)",
    order: 10,
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
                            <strong>{reto.order + ".- "}</strong> {reto.title}
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
