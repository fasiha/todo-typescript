import React, { useState, Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Data, Category } from "../App";
import "./addlist.css";
import produce from "immer";

interface AddProps {
  setData: Dispatch<SetStateAction<Data>>;
}

function AddList(props: AddProps) {
  const { setData } = props;

  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createNew = () => {
    const newCat: Category = {
      category,
      todo: [],
    };
    if (category.length === 0) return;
    setData(
      produce((draft) => {
        draft.push(newCat);
      })
    );
    handleClose();
  };

  return (
    <>
      <button onClick={handleShow}>+</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createNew}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddList;
