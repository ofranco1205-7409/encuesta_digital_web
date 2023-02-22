import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Divider, Form, Header, Loader, Segment } from "semantic-ui-react";
import { size, map } from "lodash";
import { useFormik, Field } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C12.form";
import { NavigationButtons } from "../NavigationButtons";
import "./C12.scss";
//import { BasicModal } from "../../../Shared";
//import { RetoForm } from "./RetoForm";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

const initialRetos = [
  {
    title: "{1} Red de autopistas",
    order: 1,
  },
  {
    title: "{2} Mejora de la red de carreteras nacionales",
    order: 2,
  },
  {
    title: "{3} Mejora de la red de vías rurales",
    order: 3,
  },
  {
    title: "{4} Espacios para mejorar la espera en puertos y aeropuertos",
    order: 4,
  },
  {
    title: "{5} Centros de servicio al transporte (truck centers)",
    order: 5,
  },
  {
    title: "{6} Redes de comunicaciones seguras",
    order: 6,
  },
  {
    title: "{7} Otro (especifique)",
    order: 7,
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

export function C12(props) {
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
      <div className="c12">
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
          <div className="c12__retos">
            <Header as="h3" dividing>
              <Header.Content>
                C12.- ¿Cuáles considera que son las principales necesidades de
                infraestructura?
              </Header.Content>
              <Header.Subheader>
                Ordene de más a menos importante (1 a 6) las necesidades que se
                presentan
              </Header.Subheader>
            </Header>

            <Droppable droppableId="tasks">
              {(droppableProvided) => (
                <ul
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                  className="c12__retos__task-container"
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
                            className="c12__retos__task-container__task-item"
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
