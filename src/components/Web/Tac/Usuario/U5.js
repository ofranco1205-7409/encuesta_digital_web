import React, { useEffect, useState } from "react";
import {
  Input,
  Label,
  Form,
  Radio,
  Checkbox,
  Divider,
  Message,
  Header,
} from "semantic-ui-react";
import { useFormik, Field } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./U5.form";
import { NavigationButtons } from "../NavigationButtons";
import "./U5.scss";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function U5(props) {
  const { criteria, setCriteria, qData } = props;

  const { folio, sID, qID } = criteria;

  const [button, setButton] = useState(null);

  console.log("qData", qData);

  const formik = useFormik({
    initialValues: initialValues(qData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formValue", formValue);
      //let qRes_tmp={...formValue}
      //delete qRes_tmp.qRes
      //delete qRes_tmp.qRes
      try {
        const newData = {
          folio: folio,
          qID: qData.qID,
          qRes: { ...formValue },
        };
        console.log(newData);
        if (percentage > 0 && percentage <= 100) {
          if (qData.qRes) {
            console.log("Update question");
            await tacController.updateQuestion(newData);
          } else {
            console.log("Insert question");
            await tacController.createQuestion(newData);
          }

          tn.updateQuestion(button, setCriteria);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    let sum = 0;
    Object.entries(formik.values).forEach(([key, value]) => {
      if (!(key === "otros_costos")) {
        sum = sum + Number(value);
      }
    });

    /*
    let sum = Object.values(formik.values).reduce(function (
      accumulator,
      curValue
    ) {
      return accumulator + Number(curValue);
    },
    0);
    */

    //console.log("formik.values", formik.values);
    setPercentage(sum);
  }, [formik.values]);

  return (
    <div className="u5">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            U5.- Segmentación de sus costos logísticos (en porcentaje)
          </Header.Content>
          <Header.Subheader>
            Coloque el % aproximado de cada costo que aplique en su negocio
          </Header.Subheader>
        </Header>
        <Form.Group grouped>
          <Form.Field>
            <Input
              size="mini"
              name="distribucion"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.distribucion}
              error={formik.errors.distribucion}
            >
              <input />
              <Label>%</Label>
              <Label basic>Distribución</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="aduanas"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.aduanas}
              error={formik.errors.aduanas}
            >
              <input />
              <Label>%</Label>
              <Label basic>Aduanas</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="administrativos_y_servicio_cliente"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.administrativos_y_servicio_cliente}
              error={formik.errors.administrativos_y_servicio_cliente}
            >
              <input />
              <Label>%</Label>
              <Label basic>Administrativos y de servicio al cliente</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="comerciales"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.comerciales}
              error={formik.errors.comerciales}
            >
              <input />
              <Label>%</Label>
              <Label basic>Comerciales</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="seguros_a_carga"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.seguros_a_carga}
              error={formik.errors.seguros_a_carga}
            >
              <input />
              <Label>%</Label>
              <Label basic>Seguros a la carga</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="impuestos"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.impuestos}
              error={formik.errors.impuestos}
            >
              <input />
              <Label>%</Label>
              <Label basic>Impuestos</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="depreciacion_activos"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.depreciacion_activos}
              error={formik.errors.depreciacion_activos}
            >
              <input />
              <Label>%</Label>
              <Label basic>Depreciación de activos</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="empaquetado_etiquetado"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.empaquetado_etiquetado}
              error={formik.errors.empaquetado_etiquetado}
            >
              <input />
              <Label>%</Label>
              <Label basic>Empaquetado/etiquetado</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="abastecimiento"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.abastecimiento}
              error={formik.errors.abastecimiento}
            >
              <input />
              <Label>%</Label>
              <Label basic>Abastecimiento</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="logistica_inversa"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.logistica_inversa}
              error={formik.errors.logistica_inversa}
            >
              <input />
              <Label>%</Label>
              <Label basic>Logística inversa</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="combustible"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.combustible}
              error={formik.errors.combustible}
            >
              <input />
              <Label>%</Label>
              <Label basic>Combustible</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="laborales"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.laborales}
              error={formik.errors.laborales}
            >
              <input />
              <Label>%</Label>
              <Label basic>Laborales</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="almacenamiento_picking"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.almacenamiento_picking}
              error={formik.errors.almacenamiento_picking}
            >
              <input />
              <Label>%</Label>
              <Label basic>Almacenamiento/picking</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="gestion_compras"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.gestion_compras}
              error={formik.errors.gestion_compras}
            >
              <input />
              <Label>%</Label>
              <Label basic>Gestión de compras</Label>
            </Input>
          </Form.Field>

          <Form.Field>
            <Input
              size="mini"
              name="reciclaje"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.reciclaje}
              error={formik.errors.reciclaje}
            >
              <input />
              <Label>%</Label>
              <Label basic>Reciclaje</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="costos_ambientales"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.costos_ambientales}
              error={formik.errors.costos_ambientales}
            >
              <input />
              <Label>%</Label>
              <Label basic>Costos ambientales</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="capacitación"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.capacitación}
              error={formik.errors.capacitación}
            >
              <input />
              <Label>%</Label>
              <Label basic>Capacitación</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="alquileres_hipotecas"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.alquileres_hipotecas}
              error={formik.errors.alquileres_hipotecas}
            >
              <input />
              <Label>%</Label>
              <Label basic>Alquileres/hipotecas</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="vigilancia_seguridad"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.vigilancia_seguridad}
              error={formik.errors.vigilancia_seguridad}
            >
              <input />
              <Label>%</Label>
              <Label basic>Vigilancia/seguridad</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="tiempos_muertos"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.tiempos_muertos}
              error={formik.errors.tiempos_muertos}
            >
              <input />
              <Label>%</Label>
              <Label basic>Tiempos muertos</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="viaticos_estancias"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.viaticos_estancias}
              error={formik.errors.viaticos_estancias}
            >
              <input />
              <Label>%</Label>
              <Label basic>Viáticos/estancias</Label>
            </Input>
          </Form.Field>
        </Form.Group>
        <Divider />
        {percentage === 0 ? (
          <Message
            negative
            icon="percent"
            header="Porcentaje debe ser mayor a cero"
            content={"Suma actual: " + percentage}
          />
        ) : percentage > 100 ? (
          <Message
            negative
            icon="percent"
            header="Porcentaje exedido"
            content={"Suma actual: " + percentage}
          />
        ) : (
          <Message info icon="percent" header={"Suma actual: " + percentage} />
        )}
        <p />
        <NavigationButtons
          setButton={setButton}
          formik={formik}
          progress={tn.getProgress(criteria)}
        />
      </Form>
    </div>
  );
}
