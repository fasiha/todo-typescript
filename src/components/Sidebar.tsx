import "./sidebar.css";
import avatar from "../images/avatar.png";
import { Data } from "../App";
import React, { Dispatch, SetStateAction } from "react";
import AddList from "./AddList";
import Button from "react-bootstrap/Button";

interface SideProps {
  categories: Array<string>;
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
  setSelected2: Dispatch<SetStateAction<number>>;
}

const Sidebar = (props: SideProps) => {
  const { data, setData, selected, setSelected, setSelected2 } = props;
  const categories = data.map((d) => d.category);
  const numTodo = data.map((d) => d.todo.length);

  const selectNum = (e: any): void => {
    setSelected(Number(e.currentTarget.id));
    setSelected2(0);
  };

  const UserHeader = () => {
    const saveLocal = () => {
      localStorage.setItem("data", JSON.stringify(data));
    };
    return (
      <div className="userheader">
        <img src={avatar}></img>
        <div className="userinfo">
          <h3>User</h3>
          <p>Free Plan</p>
        </div>
        <Button variant="outline-info" onClick={saveLocal}>
          Save
        </Button>{" "}
      </div>
    );
  };

  const selectedstyle = {
    backgroundColor: "rgba(116, 116, 231, 0.527)",
    color: "white",
  };

  return (
    <>
      <UserHeader />
      <div className="sidebar">
        <div className="mylist">
          <div className="mylistheader">
            <h3>My Lists</h3>
            <AddList setData={setData} />
          </div>
          <ul>
            {categories.map((category, i) => {
              if (i === selected) {
                return (
                  <li
                    key={i}
                    id={String(i)}
                    className="categorylist"
                    onClick={selectNum}
                    style={selectedstyle}
                  >
                    <div className="categoryli">{category}</div>{" "}
                    <div className="numtodo">{numTodo[i]}</div>
                  </li>
                );
              } else {
                return (
                  <li
                    key={i}
                    id={String(i)}
                    className="categorylist"
                    onClick={selectNum}
                  >
                    <div className="categoryli">{category}</div>{" "}
                    <div className="numtodo">{numTodo[i]}</div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
