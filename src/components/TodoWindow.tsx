import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import "./folderwindow.css";
import { Data, Todo } from "../App";
import produce from "immer";
import "./todowindow.css";

interface SideProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  selected: number;
  selected2: number;
}

const TodoWindow = (props: SideProps) => {
  const { data, setData, selected, selected2 } = props;
  const list = data[selected].category;
  const todo = data[selected].todo[selected2];
  const [name, setName] = useState(todo?.name);
  const [note, setNote] = useState(todo?.note);
  useEffect(() => {
    setName(data[selected].todo[selected2].name);
    setNote(data[selected].todo[selected2].note);
  }, [selected, selected2]);

  const updateName = (e: any) => {
    setData(
      produce((draft) => {
        draft[selected].todo[selected2].name = name;
      })
    );
  };
  const updateNote = (e: any) => {
    setData(
      produce((draft) => {
        draft[selected].todo[selected2].note = note;
      })
    );
  };
  return (
    <div className="todowindow">
      <div className="headertodo">MyLists &gt; {list}</div>
      <div className="content">
        <input
          value={name}
          className="nameinput"
          onBlur={updateName}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <div className="notediv">
          <h5 id="note">NOTES</h5>
          <div className="textdiv">
            <textarea
              className="notearea"
              value={note}
              onBlur={updateNote}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoWindow;
