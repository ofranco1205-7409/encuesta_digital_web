import React, { useState } from "react";
import { Input, Label, Form, Radio, Checkbox } from "semantic-ui-react";
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

  /*
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
  */

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
        /*
        if (button === "anterior") {
          console.log("Button 1 clicked!");
          previous(criteria.qIndex - 1);
        } else if (button === "siguiente") {
          console.log("Button 2 clicked!");
          next(criteria.qIndex + 1);
        }*/
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="tac-form">
      <Form onSubmit={formik.handleSubmit}>
        <h3>
          C.1.4. ¿Cuáles son sus principales costos de operación? (porcentaje
          aproximado)
        </h3>
        <Form.Group grouped>
          <Form.Field>
            <Input
              name="combustible"
              labelPosition="right"
              type="text"
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
              name="personal_conduccion"
              labelPosition="right"
              type="text"
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
              name="administrativos_y_servicio_cliente"
              labelPosition="right"
              type="text"
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
              name="comerciales"
              labelPosition="right"
              type="text"
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
              name="financieros_pago_deuda"
              labelPosition="right"
              type="text"
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
              name="seguros"
              labelPosition="right"
              type="text"
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
              name="impuestos"
              labelPosition="right"
              type="text"
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
              name="depreciacion_flota_y_otros_activos"
              labelPosition="right"
              type="text"
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
              name="costos_ambientales"
              labelPosition="right"
              type="text"
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
              name="capacitacion"
              labelPosition="right"
              type="text"
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
              name="alquileres_hipotecas"
              labelPosition="right"
              type="text"
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
              name="vigilancia_seguridad"
              labelPosition="right"
              type="text"
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
              name="tiempos_muertos"
              labelPosition="right"
              type="text"
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
              name="viaticos_estancias"
              labelPosition="right"
              type="text"
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
              name="otros"
              labelPosition="right"
              type="text"
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
        </Form.Group>

        <NavigationButtons
          setButton={setButton}
          formik={formik}
          progress={tn.getProgress(criteria)}
        />
      </Form>
    </div>
  );
}
