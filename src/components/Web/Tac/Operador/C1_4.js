import React, { useEffect, useState } from "react";
import {
  Input,
  Label,
  Form,
  Radio,
  Checkbox,
  Divider,
  Message,
} from "semantic-ui-react";
import { useFormik, Field } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C1_4.form";
import { NavigationButtons } from "../NavigationButtons";
import "./C1_4.scss";
import { TacNavigation } from "../../../../components/Web/Tac/TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C1_4(props) {
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
        if (qData.qRes) {
          console.log("Update question");
          await tacController.updateQuestion(newData);
        } else {
          console.log("Insert question");
          await tacController.createQuestion(newData);
        }

        tn.updateQuestion(button, setCriteria);
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
    <div className="c1_4">
      <Form onSubmit={formik.handleSubmit}>
        <h3>
          C.1.4. ¿Cuáles son sus principales costos de operación? (porcentaje
          aproximado)
        </h3>
        {/*
        <Form.Group widths="2">
          <Form.Input fluid label="Combustible" placeholder="00" />
          <Form.Input fluid label="Personal de conducción" placeholder="00" />
          <Form.Input
            fluid
            label="Administrativos y de servicio al cliente"
            placeholder="00"
          />
          <Form.Input fluid label="Comerciales" placeholder="00" />
        </Form.Group>
        */}
        <Form.Group grouped>
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
              name="personal_conduccion"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.personal_conduccion}
              error={formik.errors.personal_conduccion}
            >
              <input />
              <Label>%</Label>
              <Label basic>Personal de conducción</Label>
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
              name="financieros_pago_deuda"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.financieros_pago_deuda}
              error={formik.errors.financieros_pago_deuda}
            >
              <input />
              <Label>%</Label>
              <Label basic>Financieros/pago de deuda</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            <Input
              size="mini"
              name="seguros"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.seguros}
              error={formik.errors.seguros}
            >
              <input />
              <Label>%</Label>
              <Label basic>Seguros </Label>
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
              name="depreciacion_flota_y_otros_activos"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.depreciacion_flota_y_otros_activos}
              error={formik.errors.depreciacion_flota_y_otros_activos}
            >
              <input />
              <Label>%</Label>
              <Label basic>Depreciación de la flota y otros activos</Label>
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
              name="capacitacion"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.capacitacion}
              error={formik.errors.capacitacion}
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
          <Form.Field>
            <Input
              size="mini"
              name="otros"
              labelPosition="right"
              type="number"
              min={0}
              max={100}
              placeholder="00"
              onChange={formik.handleChange}
              value={formik.values.otros}
              error={formik.errors.otros}
            >
              <input />
              <Label>%</Label>
              <Label basic>Otros (señale cuáles)</Label>
            </Input>
          </Form.Field>
          <Form.Field
            label=""
            control="input"
            type="text"
            name="otros_costos"
            //id="qRes2"
            onChange={formik.handleChange}
            value={formik.values.otros_costos}
            error={formik.errors.otros_costos}
          />
        </Form.Group>
        <Divider />
        {percentage > 100 ? (
          <Message
            negative
            icon="percent"
            header="Porcentaje exedido"
            content={"Suma actual " + percentage}
          />
        ) : (
          <Message info icon="percent" header={"Suma actual " + percentage} />
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
