import React, { Dispatch, SetStateAction, useState } from "react";
import "./folderwindow.css";
import { Data, Todo } from "../App";
import produce from "immer";

interface SideProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  selected: number;
  selected2: number;
}

const TodoWindow = (props: SideProps) => {
  const { data, setData, selected, selected2 } = props;
  if (selected === -1) {
    return <></>;
  }
  const list = data[selected].category;
  const todo = data[selected].todo[selected2];
  const name = todo.name;
  const note = todo.note;
  const updateName = (e: any) => {
    setData(
      produce((draft) => {
        draft[selected].todo[selected2].name = e.target.value;
      })
    );
  };
  const updateNote = (e: any) => {
    setData(
      produce((draft) => {
        draft[selected].todo[selected2].note = e.target.value;
      })
    );
  };
  return (
    <div className="todowindow">
      <div className="headertodo">MyLists &gt; {list}</div>
      <div className="content">
        <input
          defaultValue={name}
          onBlur={updateName}
          className="nameinput"
        ></input>
        <div className="notediv">
          <h5 id="note">NOTES</h5>
          <div className="textdiv">
            <textarea onBlur={updateNote} defaultValue={note}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoWindow;
