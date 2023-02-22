import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Divider, Form, Header, Loader, Segment } from "semantic-ui-react";
import { size, map } from "lodash";
import { useFormik, Field } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U2.form";
import { NavigationButtons } from "../NavigationButtons";
import "./U2.scss";
//import { BasicModal } from "../../../Shared";
//import { RetoForm } from "./RetoForm";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

const initialRetos = [
  {
    title: "{1} Almacenamiento",
    order: 1,
  },
  {
    title: "{2} Planificación y gestión de inventario",
    order: 2,
  },
  {
    title: "{3} Operaciones de transporte",
    order: 3,
  },
  {
    title: "{4} Negociación con proveedores",
    order: 4,
  },
  {
    title: "{5} Coordinación de facturación a clientes",
    order: 5,
  },
  {
    title: "{6} Procesamiento de órdenes de compra",
    order: 6,
  },
  {
    title: "{7} Administración de la flota terrestre",
    order: 7,
  },
  {
    title: "{8} Tecnologías de la información",
    order: 8,
  },
  {
    title: "{9} Planificación de la producción",
    order: 9,
  },
  {
    title: "{10} Logística inversa/devoluciones",
    order: 10,
  },
  {
    title: "{11} Selección de proveedores de insumos",
    order: 11,
  },
  {
    title: "{12} Análisis de mercado/demandas",
    order: 12,
  },
  {
    title: "{13} Definición y coordinación política de precios",
    order: 13,
  },
  {
    title: "{14} Diseño de la red de distribución",
    order: 14,
  },
  {
    title: "{15} Gestión de trámites institucionales",
    order: 15,
  },
  {
    title: "{16} Pago de tasas e impuestos",
    order: 16,
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

export function U2(props) {
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
      <div className="u2">
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
          <div className="u2__retos">
            <Header as="h3" dividing>
              <Header.Content>
                U2.- Ordene por importancia (1 más, 10 menos) los procesos
                logísticos claves para su negocio
              </Header.Content>
              <Header.Subheader>
                Click y sin soltar, arrastre a la posición adecuada en la lista
              </Header.Subheader>
            </Header>

            <Droppable droppableId="tasks">
              {(droppableProvided) => (
                <ul
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                  className="u2__retos__task-container"
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
