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
                <Table.HeaderCell collapsing>Antigüedad</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Cama baja</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_1A"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_1A}
                    error={formik.errors.C4_1_1A}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_1B"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_1B}
                    error={formik.errors.C4_1_1B}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Camión refrigerado</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_2A"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_2A}
                    error={formik.errors.C4_1_2A}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_2B"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_2B}
                    error={formik.errors.C4_1_2B}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Furgones o furgonetas</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_3A"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_3A}
                    error={formik.errors.C4_1_3A}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_3B"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_3B}
                    error={formik.errors.C4_1_3B}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Lowboy trailer</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_4A"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_4A}
                    error={formik.errors.C4_1_4A}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_4B"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_4B}
                    error={formik.errors.C4_1_4B}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Portacontenedores/planchas</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_5A"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_5A}
                    error={formik.errors.C4_1_5A}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_5B"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_5B}
                    error={formik.errors.C4_1_5B}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Tanques</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_6A"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_6A}
                    error={formik.errors.C4_1_6A}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_6B"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_6B}
                    error={formik.errors.C4_1_6B}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Portavehículos/camión nodriza</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_7A"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_7A}
                    error={formik.errors.C4_1_7A}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_7B"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_7B}
                    error={formik.errors.C4_1_7B}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Otros</Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_8A"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_8A}
                    error={formik.errors.C4_1_8A}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Field
                    control="input"
                    type="number"
                    name="C4_1_8B"
                    min={0}
                    placeholder="0"
                    //id="qRes2"
                    onChange={formik.handleChange}
                    value={formik.values.C4_1_8B}
                    error={formik.errors.C4_1_8B}
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
