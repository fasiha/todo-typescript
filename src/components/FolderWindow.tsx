import React, { Dispatch, SetStateAction, useState } from "react";
import "./folderwindow.css";
import { Data, Todo } from "../App";
import produce from "immer";
import RemoveList from "./RemoveList";

interface SideProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  selected: number;
  selected2: number;
  setSelected: Dispatch<SetStateAction<number>>;
  setSelected2: Dispatch<SetStateAction<number>>;
}

const FolderWindow = (props: SideProps) => {
  const { data, setData, setSelected, selected, selected2, setSelected2 } =
    props;
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    const newObj: Todo = {
      name: newTodo,
      note: "",
    };
    if (newTodo == "") return;
    setData(
      produce((draft) => {
        // FYI unshift is slow for deep computer science/data structures reasons
        // https://stackoverflow.com/questions/44031591/performance-of-array-push-vs-array-unshift
        // You definitely don't need to understand all this now but eventually
        // it will be good to know because a lot of interviewers ask about this
        // kind of thing
        draft[selected].todo.unshift(newObj);
      })
    );
    setNewTodo("");
    setSelected2(0);
  };

  return (
    <div className="">
      <TopicHeader
        data={data}
        selected={selected}
        selected2={selected2}
        setData={setData}
        setSelected={setSelected}
        setSelected2={setSelected2}
      />
      <div className="folderwindow">
        <ul className="todo">
          {data[selected].todo.map((todo, i) => {
            return (
              <TodoLi
                toggleDone={() => {
                  setData(
                    produce((draft) => {
                      const done = draft[selected].todo[selected2].done;
                      draft[selected].todo[selected2].done = !done;
                    })
                  );
                }}
                todo={todo}
                key={i}
                index={i}
                selected2={selected2}
                setSelected2={setSelected2}
              />
            );
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

const TopicHeader: React.FC<SideProps> = ({
  data,
  selected,
  setData,
  setSelected,
  setSelected2,
}) => {
  return (
    <div className="topicheader">
      {data[selected].category}
      <RemoveList
        setData={setData}
        index={selected}
        setSelected={setSelected}
        setSelected2={setSelected2}
        name={data[selected].category}
      />
    </div>
  );
};

interface todoProps {
  todo: Todo;
  index: number;
  setSelected2: Dispatch<SetStateAction<number>>;
  selected2: number;
  toggleDone: () => void;
}

const TodoLi = (props: todoProps) => {
  // TODO move this to styled components or a class so this object doesn't get recreated every render
  const selectedstyle: React.CSSProperties = {
    backgroundColor: "rgba(116, 116, 231, 0.527)",
    color: "white",
  };
  const doneStyle: React.CSSProperties = {
    textDecoration: "line-through",
  };

  const { todo, index } = props;

  const selected = index === props.selected2;
  const done = todo.done;
  return (
    <li
      key={index}
      id={String(index)}
      style={{ ...(selected ? selectedstyle : {}), ...(done ? doneStyle : {}) }}
      onClick={() => props.setSelected2(index)}
    >
      <button className="check" onClick={props.toggleDone}>
        {done ? "✅" : ""}
      </button>
      <span className="todoname">{todo.name}</span>
    </li>
  );
};

/*
The above TodoLi component needs the following, I've just given it a line-through:

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
*/
