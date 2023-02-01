import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { Tac } from "../../../../../api";
import { RetoItem } from "../RetoItem";
import "./ListReto.scss";

const tacController = new Tac();

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

export function ListReto(props) {
  const { reload, onReload, retos, setRetos } = props;
  const { qData } = props;
  //const [retos, setRetos] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setRetos(null);
        const response = await tacController.getQuestions(qData);
        console.log("response", response);
        if (response[0]) {
          setRetos(response[0].qRes);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

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
            <Droppable droppableId="tasks">
              {(droppableProvided) => (
                <ul
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                  className="a1__retos__task-container"
                >
                  {retos.map((reto, index) => (
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
                          <RetoItem
                            key={reto.order}
                            reto={reto}
                            onReload={onReload}
                            qData={qData}
                          />
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
      </div>
    </>
  );
}
