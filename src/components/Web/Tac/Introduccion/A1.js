import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Form, Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { useFormik, Field } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./A1.form";
import { NavigationButtons } from "../NavigationButtons";
import "./A1.scss";
import { BasicModal } from "../../../Shared";
import { RetoForm } from "./RetoForm";
import { TacNavigation } from "../../../../components/Web/Tac/TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

const initialRetos = [
  {
    text: "Reto 1. La empresarialización del sector y la persistencia de la informalidad y la atomización",
    order: 1,
  },
  {
    text: "Reto 2. Las condiciones de trabajo en el sector (envejecimiento, escasez de MdO, desprotección)",
    order: 2,
  },
  {
    text: "Reto 3. Las barreras de inclusión y la equidad de género en el TAC",
    order: 3,
  },
  {
    text: "Reto 4. La sostenibilidad financiera y rentabilización de las operaciones",
    order: 4,
  },
  {
    text: "Reto 5. El fortalecimiento de la profesionalización y capacitación",
    order: 5,
  },
  {
    text: "Reto 6. La situación de la accidentabilidad en el servicio TAC",
    order: 6,
  },
  {
    text: "Reto 7. El impulso al nearshoring y el aumento de la logística globalizada y digitalizada",
    order: 7,
  },
  {
    text: "Reto 8. Los nuevos modelos de distribución/consolidación (e-commerce, grupaje, etc.)",
    order: 8,
  },
  {
    text: "Reto 9. Las energías verdes y la adaptación al cambio climático de la flota TAC",
    order: 9,
  },
  {
    text: "Reto 10. El contexto de seguridad (física, cyber, etc.)",
    order: 10,
  },
  {
    text: "Reto 11. Una institucionalidad incompleta e inadecuada",
    order: 11,
  },
  {
    text: "Reto 12. La provisión de infraestructura de soporte a la operativa del TAC",
    order: 12,
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

export function A1(props) {
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
      <div className="a1">
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
          <div className="a1__retos">
            <h2>
              A. Ordene los siguientes retos claves para el Transporte Automotor
              de Carga (TAC)
            </h2>
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
                            className="a1__retos__task-container__task-item"
                            style={getItemStyle(
                              snapshot.isDragging,
                              draggableProvided.draggableProps.style
                            )}
                          >
                            {reto.text}
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
