import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../../Shared";
import { Tac } from "../../../../../api";
import { folio } from "../../../../../hooks";
import { RetoForm } from "../RetoForm";
import "./RetoItem.scss";

const tacController = new Tac();

export function RetoItem(props) {
  const { reto, onReload, qData } = props;

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openUpdateReto = () => {
    setTitleModal(`Actualizar reto: ${reto.title}`);
    onOpenCloseModal();
  };

  const openDeleteConfirm = () => {
    setConfirmMessage(`Eliminar el reto: ${reto.title}`);
    onOpenCloseConfirm();
  };

  const onDelete = async () => {
    try {
      await tacController.updateRetos(qData, null, reto.order, "D");
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="menu-item">
        <div className="menu-item__info">
          <span className="menu-item__info-title">{reto.title}</span>
        </div>

        <div>
          <Button icon primary onClick={openUpdateReto}>
            <Icon name="pencil" />
          </Button>
          <Button icon color="red" onClick={openDeleteConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <RetoForm
          onClose={onOpenCloseModal}
          onReload={onReload}
          reto={reto}
          qData={qData}
        />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
