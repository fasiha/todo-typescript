import React, { Dispatch, SetStateAction } from "react";
import "./folderwindow.css";
import { Data } from "../App";
import produce from "immer";

interface SideProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  selected: number;
}

const FolderWindow = (props: SideProps) => {
  const { data, setData, selected } = props;
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
            return (
              <li key={i} id={String(i)}>
                <button className="check" onClick={selectTodo}></button>
                <span className="todoname">{todo.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FolderWindow;
