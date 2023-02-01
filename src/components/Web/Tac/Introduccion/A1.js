import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button, Progress } from "semantic-ui-react";
import "./A1.scss";
import { BasicModal } from "../../../Shared";
import { RetoForm } from "./RetoForm";

const initialTasks = [
  {
    id: "1",
    text: "Reto 1. La empresarialización del sector y la persistencia de la informalidad y la atomización",
  },
  {
    id: "2",
    text: "Reto 2. Las condiciones de trabajo en el sector (envejecimiento, escasez de MdO, desprotección)",
  },
  {
    id: "3",
    text: "Reto 3. Las barreras de inclusión y la equidad de género en el TAC",
  },
  {
    id: "4",
    text: "Reto 4. La sostenibilidad financiera y rentabilización de las operaciones",
  },
  {
    id: "5",
    text: "Reto 5. El fortalecimiento de la profesionalización y capacitación",
  },
  {
    id: "6",
    text: "Reto 6. La situación de la accidentabilidad en el servicio TAC",
  },
  {
    id: "7",
    text: "Reto 7. El impulso al nearshoring y el aumento de la logística globalizada y digitalizada",
  },
  {
    id: "8",
    text: "Reto 8. Los nuevos modelos de distribución/consolidación (e-commerce, grupaje, etc.)",
  },
  {
    id: "9",
    text: "Reto 9. Las energías verdes y la adaptación al cambio climático de la flota TAC",
  },
  {
    id: "10",
    text: "Reto 10. El contexto de seguridad (física, cyber, etc.)",
  },
  {
    id: "11",
    text: "Reto 11. Una institucionalidad incompleta e inadecuada",
  },
  {
    id: "12",
    text: "Reto 12. La provisión de infraestructura de soporte a la operativa del TAC",
  },
];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
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

export function A1() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevStata) => !prevStata);

  const [tasks, setTasks] = useState(initialTasks);
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

            setTasks((prevTasks) =>
              reorder(prevTasks, source.index, destination.index)
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
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
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
                          {task.text}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </DragDropContext>

        <div className="navigation-buttons">
          <Button
            primary
            onClick={() => {
              console.log("2");
              //setButton(2);
            }}
          >
            Siguiente
          </Button>
          <div className="navigation-buttons__progress-bar">
            <Progress value="1" total="8" size="tiny" color="grey">
              1/8
            </Progress>
          </div>
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Reto">
        <RetoForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
