import React, { useState } from "react";
import { Form, Accordion, Icon, Checkbox } from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./B1.form";
import { NavigationButtons } from "../NavigationButtons";

const tacController = new Tac();

export function B1(props) {
  const { criteria, setCriteria, qData } = props;

  const { sID } = criteria;

  const [button, setButton] = useState(null);

  console.log(qData);

  console.log(criteria.survey[sID].questions);

  const next = (i) => {
    if (i > criteria.survey[sID].questions.length - 1) {
      i = criteria.survey[sID].questions.length - 1;
    }
    setCriteria({ ...criteria, qIndex: i });
    console.log(i);
    console.log(criteria.qIndex);
  };

  const previous = (i) => {
    if (i < 0) {
      i = 0;
    }
    setCriteria({ ...criteria, qIndex: i });
    console.log(i);
    console.log(criteria.qIndex);
  };

  const formik = useFormik({
    initialValues: initialValues(qData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("onSubmit");
      console.log(formValue);
      try {
        const newData = {
          folio: qData.folio,
          qID: qData.qID,
          qRes: formValue.B1,
        };
        console.log(newData);
        if (qData.qRes) {
          console.log("Update question");
          await tacController.updateQuestion(newData);
        } else {
          console.log("Insert question");
          await tacController.createQuestion(newData);
        }

        if (button === 1) {
          console.log("Button 1 clicked!");
          previous(criteria.qIndex - 1);
        } else if (button === 2) {
          console.log("Button 2 clicked!");
          next(criteria.qIndex + 1);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  console.log(formik.values);

  //Acordeon
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    console.log(titleProps);
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  return (
    <div className="tac-form">
      <Form onSubmit={formik.handleSubmit}>
        <h2>
          B.1. ¿Con cuáles de las siguientes definiciones se identifica su
          actividad principal?
        </h2>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name="dropdown" />
            Transportista terrestre
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Form.Group grouped>
              <Form.Field
                label="Distribución urbana, paquetería, e-commerce"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="A"
                checked={formik.values.B1.includes("A")}
                error={formik.errors.qRes}
              />
              <Form.Field
                label="Servicios de transporte doméstico y mudanzas"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="B"
                checked={formik.values.B1.includes("B")}
                error={formik.errors.qRes}
              />
              <Form.Field
                label="Distribución nacional de productos terminados"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="C"
                checked={formik.values.B1.includes("C")}
                error={formik.errors.qRes}
              />
              <Form.Field
                label="Transporte de insumos y acarreo de productos agrícolas"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="D"
                checked={formik.values.B1.includes("D")}
                error={formik.errors.qRes}
              />
            </Form.Group>
            <Checkbox label="Transporte de carga general internacional" />
            <Checkbox label="Transporte de carga contenerizada internacional" />
            <Checkbox label="Transporte de carga en tránsito fiscal / ZFs" />
            <Checkbox label="Transporte de automóviles" />
            <Checkbox label="Cadena de frío" />
            <Checkbox label="Camión aéreo" />
            <Checkbox label="Transporte de graneles sólidos" />
            <Checkbox label="Transporte de graneles líquidos no peligrosos" />

            <Checkbox label="Productos peligrosos" />
            <Checkbox label="Transporte de combustibles y derivados" />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Icon name="dropdown" />
            Agente de la cadena de transporte o logística (almacenista, agente
            de carga, agente de aduanas, agente naviero, transitario)
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Checkbox label="Almacenista" /> <br />
            <Checkbox label="Agente de carga" /> <br />
            <Checkbox label="Agente de aduanas" /> <br />
            <Checkbox label="Agente naviero, consignatario" /> <br />
            <Checkbox label="Transitario" /> <br />
            <Checkbox label="Operador logístico 3PL/4PL/5PL" /> <br />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}
          >
            <Icon name="dropdown" />
            Cargador, propietario de de mercancía
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Checkbox label="Productores de materia prima (vegetal o mineral)" />{" "}
            <br />
            <Checkbox label="Fabricantes de productos industriales (intermedio o final)" />{" "}
            <br />
            <Checkbox label="Sector Construcción" /> <br />
            <Checkbox label="Sector Energía y Combustibles " /> <br />
            <Checkbox label="Importadores y distribuidores comerciales (mayoristas y minoristas)" />{" "}
            <br />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 3}
            index={3}
            onClick={handleClick}
          >
            <Icon name="dropdown" />
            Otro
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <Checkbox label="Operador de infraestructura de transporte o logística (terminal portuario, aeroportuario, operardor de autopista, etc.)" />{" "}
            <br />
            <Checkbox label="Sector público" /> <br />
          </Accordion.Content>
        </Accordion>

        <NavigationButtons setButton={setButton} formik={formik} />
      </Form>
    </div>
  );
}
