import React, { useEffect, useState } from "react";
import {
  Input,
  Label,
  Form,
  Radio,
  Checkbox,
  Divider,
  Message,
  Segment,
  Icon,
  Header,
  Table,
} from "semantic-ui-react";
import { useFormik, Field } from "formik";
import { Tac } from "../../../../api";
import { initialValues, validationSchema } from "./C4_1.form";
import { NavigationButtons } from "../NavigationButtons";
import "./C4_1.scss";
import { TacNavigation } from "../TacNavigation";

const tacController = new Tac();
const tn = new TacNavigation();

export function C4_1(props) {
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

  return (
    <div className="c4_1">
      <Form onSubmit={formik.handleSubmit}>
        <Header as="h3" dividing>
          <Header.Content>
            C4.1.- Cantidad y antigüedad promedio de la flota por tipología de
            vehículos
          </Header.Content>
          <Header.Subheader>Complete la información.</Header.Subheader>
        </Header>

        <div className="c4_1__table-container">
          <p></p>
          <Table celled striped selectable color="black" size="small" compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Label color="blue" ribbon>
                    Tipología de vehículos
                  </Label>
                </Table.HeaderCell>
                <Table.HeaderCell collapsing>Cantidad</Table.HeaderCell>
                <Table.HeaderCell collapsing>
                  Antigüedad (años)
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Cabeza tractora, cabezote, cabezal</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="A1"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.A1}
                    error={formik.errors.A1}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="B1"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.B1}
                    error={formik.errors.B1}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cama baja</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="A2"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.A2}
                    error={formik.errors.A2}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="B2"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.B2}
                    error={formik.errors.B2}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Camión refrigerado</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="A3"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.A3}
                    error={formik.errors.A3}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="B3"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.B3}
                    error={formik.errors.B3}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Furgones o furgonetas</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="A4"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.A4}
                    error={formik.errors.A4}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="B4"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.B4}
                    error={formik.errors.B4}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Lowboy trailer</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="A5"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.A5}
                    error={formik.errors.A5}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="B5"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.B5}
                    error={formik.errors.B5}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Portacontenedores/planchas</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="A6"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.A6}
                    error={formik.errors.A6}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="B6"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.B6}
                    error={formik.errors.B6}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Tanques</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="A7"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.A7}
                    error={formik.errors.A7}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="B7"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.B7}
                    error={formik.errors.B7}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Portavehículos/camión nodriza</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="A8"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.A8}
                    error={formik.errors.A8}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="B8"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.B8}
                    error={formik.errors.B8}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Otros</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="A9"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.A9}
                    error={formik.errors.A9}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="B9"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.B9}
                    error={formik.errors.B9}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
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
