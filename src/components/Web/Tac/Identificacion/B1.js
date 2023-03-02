import React, { useState } from "react";
import {
  Form,
  Accordion,
  Icon,
  Divider,
  Header,
  Message,
} from "semantic-ui-react";
import { useFormik } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./B1.form";
import { NavigationButtons } from "../NavigationButtons";
import { TacNavigation } from "../../../../components/Web/Tac/TacNavigation";
import "./B1.scss";
import { size } from "lodash";

const tacController = new Tac();
const tn = new TacNavigation();

export function B1(props) {
  const { criteria, setCriteria, qData } = props;

  const [button, setButton] = useState(null);

  console.log("qData", qData);

  const getIOpeUser = (data) => {
    //0 Operdor
    //1 Usuario
    //2 Secto publico
    let iOperUser = 0;

    if (Array.isArray(data)) {
      if (data.includes("402")) {
        iOperUser = 2;
      }

      if (
        data.includes("101") ||
        data.includes("102") ||
        data.includes("103") ||
        data.includes("104") ||
        data.includes("105") ||
        data.includes("106") ||
        data.includes("107") ||
        data.includes("108") ||
        data.includes("109") ||
        data.includes("110") ||
        data.includes("111") ||
        data.includes("112") ||
        data.includes("113") ||
        data.includes("114") ||
        data.includes("201") ||
        data.includes("202") ||
        data.includes("203") ||
        data.includes("204") ||
        data.includes("205") ||
        data.includes("206")
      ) {
        iOperUser = 0;
      }

      if (
        data.includes("301") ||
        data.includes("302") ||
        data.includes("303") ||
        data.includes("304") ||
        data.includes("305") ||
        data.includes("401")
      ) {
        iOperUser = 1;
      }
    } else {
      console.error("No se pudo determinar set de preguntas");
    }

    return iOperUser;
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

        const iOpeUser = getIOpeUser(newData.qRes);

        tn.updateQuestion(button, setCriteria, iOpeUser);
      } catch (error) {
        console.error(error);
      }
    },
  });

  console.log(formik.values);

  let idx = -1;
  if (qData.qRes && size(qData.qRes) > 0) {
    const q0 = qData.qRes[qData.qRes.length - 1];
    idx = Math.trunc(q0 / 100) - 1;
    console.log("idx acordeon", idx);
  }

  //Acordeon
  const [activeIndex, setActiveIndex] = useState(idx);

  const handleClick = (e, titleProps) => {
    console.log(titleProps);
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  return (
    <div className="b1">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            B1.- ¿Con cuáles de las siguientes definiciones se identifica su
            actividad principal?
          </Header.Content>
          <Header.Subheader>
            Seleccione todas las opciones que apliquen, tanto en la primera
            lista, como en las listas secundarias.
          </Header.Subheader>
        </Header>

        {formik.errors.B1 ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <Message.List items={formik.errors} />
          </Message>
        ) : (
          <></>
        )}
        <Accordion styled fluid>
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
                value="101"
                checked={formik.values.B1.includes("101")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Servicios de transporte doméstico y mudanzas"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="102"
                checked={formik.values.B1.includes("102")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Distribución nacional de productos terminados"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="103"
                checked={formik.values.B1.includes("103")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Transporte de insumos y acarreo de productos agrícolas"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="104"
                checked={formik.values.B1.includes("104")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Transporte de carga general internacional"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="105"
                checked={formik.values.B1.includes("105")}
                //error={formik.errors.B1}
              />

              <Form.Field
                label="Transporte de carga contenerizada internacional"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="106"
                checked={formik.values.B1.includes("106")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Transporte de carga en tránsito fiscal / ZFs"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="107"
                checked={formik.values.B1.includes("107")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Transporte de automóviles"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="108"
                checked={formik.values.B1.includes("108")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Cadena de frío"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="109"
                checked={formik.values.B1.includes("109")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Camión aéreo"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="110"
                checked={formik.values.B1.includes("110")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Transporte de graneles sólidos"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="111"
                checked={formik.values.B1.includes("111")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Transporte de graneles líquidos no peligrosos"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="112"
                checked={formik.values.B1.includes("112")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Productos peligrosos"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="113"
                checked={formik.values.B1.includes("113")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Transporte de combustibles y derivados"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="114"
                checked={formik.values.B1.includes("114")}
                //error={formik.errors.B1}
              />
            </Form.Group>
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
            <Form.Group grouped>
              <Form.Field
                label="Almacenista"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="201"
                checked={formik.values.B1.includes("201")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Agente de carga"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="202"
                checked={formik.values.B1.includes("202")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Agente de aduanas"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="203"
                checked={formik.values.B1.includes("203")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Agente naviero, consignatario"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="204"
                checked={formik.values.B1.includes("204")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Transitario"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="205"
                checked={formik.values.B1.includes("205")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Operador logístico 3PL/4PL/5PL"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="206"
                checked={formik.values.B1.includes("206")}
                //error={formik.errors.B1}
              />
            </Form.Group>
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
            <Form.Group grouped>
              <Form.Field
                label="Productores de materia prima (vegetal o mineral)"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="301"
                checked={formik.values.B1.includes("301")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Fabricantes de productos industriales (intermedio o final)"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="302"
                checked={formik.values.B1.includes("302")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Sector Construcción"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="303"
                checked={formik.values.B1.includes("303")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Sector Energía y Combustibles"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="304"
                checked={formik.values.B1.includes("304")}
                //error={formik.errors.B1}
              />
              <Form.Field
                label="Importadores y distribuidores comerciales (mayoristas y minoristas)"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="305"
                checked={formik.values.B1.includes("305")}
                //error={formik.errors.B1}
              />
            </Form.Group>
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
            <Form.Group grouped>
              <Form.Field
                label="Operador de infraestructura de transporte o logística (terminal portuario, aeroportuario, operardor de autopista, etc.)"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="401"
                checked={formik.values.B1.includes("401")}
                ////error={formik.errors.B1}
              />
              <Form.Field
                label="Sector público"
                control="input"
                type="checkbox"
                name="B1"
                //id="qRes2"
                onChange={formik.handleChange}
                value="402"
                checked={formik.values.B1.includes("402")}
                ////error={formik.errors.B1}
              />
            </Form.Group>
          </Accordion.Content>
        </Accordion>
        <p />
        <Divider />
        <NavigationButtons
          setButton={setButton}
          formik={formik}
          progress={tn.getProgress(criteria)}
        />
      </Form>
    </div>
  );
}
