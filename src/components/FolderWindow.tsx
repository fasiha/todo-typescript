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
  deleteTodo: () => void;
}

const TodoLi = (props: todoProps) => {
  const { todo, index, selected2, setSelected2, toggleDone, deleteTodo } =
    props;
  const selectTodo2 = (e: any) => {
    setSelected2(Number(e.currentTarget.id));
  };
  if (index === selected2) {
    if (todo.done) {
      return (
        <li
          key={index}
          id={String(index)}
          onClick={selectTodo2}
          className="selectedstyle"
        >
          <button className="check" onClick={toggleDone}>
            &#10003;
          </button>
          <span className="todoname linethrough">{todo.name}</span>
          <button className="deletebutton" onClick={deleteTodo}>
            &#128465;
          </button>
        </li>
      );
    } else {
      return (
        <li
          key={index}
          id={String(index)}
          onClick={selectTodo2}
          className="selectedstyle"
        >
          <button className="check" onClick={toggleDone}></button>
          <span className="todoname">{todo.name}</span>
        </li>
      );
    }
  } else {
    if (todo.done) {
      return (
        <li key={index} id={String(index)} onClick={selectTodo2}>
          <button className="check" onClick={toggleDone}>
            &#10003;
          </button>
          <span className="todoname lignthrough">{todo.name}</span>
          <button className="deletebutton" onClick={deleteTodo}>
            &#128465;
          </button>
        </li>
      );
    } else {
      return (
        <li key={index} id={String(index)} onClick={selectTodo2}>
          <button className="check" onClick={toggleDone}></button>
          <span className="todoname">{todo.name}</span>
        </li>
      );
    }
  }
};

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
                      const done = draft[selected].todo[i].done;
                      draft[selected].todo[i].done = !done;
                    })
                  );
                }}
                deleteTodo={() => {
                  setData(
                    produce((draft: Data) => {
                      draft[selected]["todo"].splice(i, 1);
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
