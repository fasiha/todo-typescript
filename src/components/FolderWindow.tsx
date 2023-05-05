import React, { Dispatch, SetStateAction, useState } from "react";
import "./folderwindow.css";
import { Data, Todo } from "../App";
import produce from "immer";

interface SideProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  selected: number;
  selected2: number;
  setSelected2: Dispatch<SetStateAction<number>>;
}

const FolderWindow = (props: SideProps) => {
  const { data, setData, selected, selected2, setSelected2 } = props;
  const [newTodo, setNewTodo] = useState("");
  const selectTodo = (e: any): void => {
    const parent = e.target.parentNode;
    const button = e.target;
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#128465;";
    deleteButton.classList.add("deletebutton");
    deleteButton.addEventListener("click", (e) => {
      // remove effect
      const span = parent.querySelector("span");
      span.style.cssText = "text-decoration:none";
      button.innerHTML = "";
      parent.removeChild(e.target);
      setData(
        produce((draft: Data) => {
          draft[selected]["todo"].splice(Number(parent.id), 1);
        })
      );
    });
    const span = e.target.parentNode.querySelector("span");
    if (button.innerText.length > 0) {
      span.style.cssText = "text-decoration:none";
      button.innerHTML = "";
      // remove delete Button
      const lastChild = parent.lastChild;
      parent.removeChild(lastChild);
    } else {
      span.style.cssText = "text-decoration:line-through";
      button.innerHTML = "&check;";
      //add delete button
      parent.appendChild(deleteButton);
    }
  };
  const selectTodo2 = (e: any) => {
    setSelected2(Number(e.currentTarget.id));
  };

  const addTodo = () => {
    const newObj: Todo = {
      name: newTodo,
      note: "",
    };
    if (newTodo == "") return;
    setData(
      produce((draft) => {
        draft[selected].todo.unshift(newObj);
      })
    );
    setNewTodo("");
  };
  const selectedstyle = {
    backgroundColor: "rgba(116, 116, 231, 0.527)",
    color: "white",
  };

  const TopicHeader: React.FC = () => {
    return <div className="topicheader">{data[selected].category}</div>;
  };
  if (selected == -1) {
    return <></>;
  }
  return (
    <div className="">
      <TopicHeader />
      <div className="folderwindow">
        <ul className="todo">
          {data[selected].todo.map((todo, i) => {
            if (i === selected2) {
              return (
                <li
                  key={i}
                  id={String(i)}
                  style={selectedstyle}
                  onClick={selectTodo2}
                >
                  <button className="check" onClick={selectTodo}></button>
                  <span className="todoname">{todo.name}</span>
                </li>
              );
            } else {
              return (
                <li key={i} id={String(i)} onClick={selectTodo2}>
                  <button className="check" onClick={selectTodo}></button>
                  <span className="todoname">{todo.name}</span>
                </li>
              );
            }
          })}
        </ul>
        <div className="inputdiv">
          <hr />
          <input
            type="text"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          ></input>{" "}
          <button className="addtodo" onClick={addTodo}>
            &#10000;
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderWindow;
