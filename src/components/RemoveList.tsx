import React, { useState, Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Data, Category } from "../App";
import "./addlist.css";
import produce from "immer";
import "./RemoveList.css";

interface AddProps {
  setData: Dispatch<SetStateAction<Data>>;
  setSelected: Dispatch<SetStateAction<number>>;
  setSelected2: Dispatch<SetStateAction<number>>;
  index: number;
  name: string;
}

function RemoveList(props: AddProps) {
  const { setData, setSelected, setSelected2, index, name } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeLi = () => {
    setData(
      produce((draft) => {
        draft.splice(index, 1);
      })
    );
    setSelected(0);
    setSelected2(0);
    handleClose();
  };

  return (
    <>
      <button onClick={handleShow}>x</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="buttonsdiv">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={removeLi}>
            Remove
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RemoveList;
