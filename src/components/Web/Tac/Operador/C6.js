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
import { initialValues, validationSchema } from "./C6.form";
import { NavigationButtons } from "../NavigationButtons";
import "./C6.scss";
//import { BasicModal } from "../../../Shared";
//import { RetoForm } from "./RetoForm";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

const initialRetos = [
  {
    title: "{1} Flota antigua",
    order: 1,
  },
  {
    title: "{2} Bajo mantenimiento de la flota",
    order: 2,
  },
  {
    title: "{3} Prácticas de riesgo de los vehículos particulares",
    order: 3,
  },
  {
    title: "{4} Poco descanso de los conductores",
    order: 4,
  },
  {
    title: "{5} Fiscalización deficiente de la polícia",
    order: 5,
  },
  {
    title: "{6} La inspección ITV no existe/es inadecuada",
    order: 6,
  },
  {
    title: "{7} Mal estado de las carreteras",
    order: 7,
  },
  {
    title: "{8} Mala señalización de las carreteras",
    order: 8,
  },
  {
    title: "{9} Otro [especifique]",
    order: 9,
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

export function C6(props) {
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
      <div className="c6">
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
          <div className="c6__retos">
            <Header as="h3" dividing>
              <Header.Content>
                C6.- ¿Cuáles considera que son las principales causas de los
                accidentes?
              </Header.Content>
              <Header.Subheader>
                Click y sin soltar, arrastre a la que considere su posición
                correcta en la lista
              </Header.Subheader>
            </Header>

            <Droppable droppableId="tasks">
              {(droppableProvided) => (
                <ul
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                  className="a1__retos__task-container"
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
                            className="c6__retos__task-container__task-item"
                            style={getItemStyle(
                              snapshot.isDragging,
                              draggableProvided.draggableProps.style
                            )}
                          >
                            {String(reto.title).startsWith("{99} Otro") ? (
                              <div className="reto-item">
                                <div className="reto-item__info">
                                  <span className="reto-item__info-title">
                                    <strong>{reto.order + ".- "}</strong>
                                    {reto.title}
                                  </span>
                                </div>
                                <div>
                                  <Button icon primary size="mini">
                                    <Icon name="pencil" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <span>
                                <strong>{reto.order + ".- "}</strong>
                                {reto.title}
                              </span>
                            )}
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
