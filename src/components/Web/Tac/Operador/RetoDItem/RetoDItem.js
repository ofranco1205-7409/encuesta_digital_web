import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../../Shared";
import { RetoDForm } from "../RetoDForm";
import "./RetoDItem.scss";

export function RetoDItem(props) {
  const { reto, onReload, qData } = props;

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openDetailReto = () => {
    setTitleModal(`${reto.title}`);
    onOpenCloseModal();
  };

  const openNoDetailReto = () => {
    setConfirmMessage(`No hay detalle para este reto`);
    onOpenCloseConfirm();
  };

  return (
    <>
      <div className="reto-item">
        <div className="reto-item__info">
          <span className="reto-item__info-title">
            <strong>{reto.order + ".- "}</strong> {reto.title}
          </span>
        </div>

        {!(
          String(reto.title).startsWith("{8}") ||
          String(reto.title).startsWith("{9}") ||
          String(reto.title).startsWith("{10}")
        ) ? (
          <div>
            <Button icon primary onClick={openDetailReto} size="mini">
              <Icon name="angle double down" />
            </Button>
          </div>
        ) : (
          <div>
            {" "}
            <Button icon primary onClick={openNoDetailReto} size="mini">
              <Icon name="window minimize" />
            </Button>
          </div>
        )}
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <RetoDForm
          onClose={onOpenCloseModal}
          onReload={onReload}
          reto={reto}
          qData={qData}
        />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onOpenCloseConfirm}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
