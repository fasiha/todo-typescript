import "./sidebar.css";
import avatar from "../images/avatar.png";
import { Data } from "../App";
import React, { Dispatch, SetStateAction } from "react";
import AddList from "./AddList";

const UserHeader = () => {
  return (
    <div className="userheader">
      <img src={avatar}></img>
      <div className="userinfo">
        <h3>User</h3>
        <p>Free Plan</p>
      </div>
    </div>
  );
};

interface SideProps {
  categories: Array<string>;
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}

const Sidebar = (props: SideProps) => {
  const { data, setData } = props;
  const categories = data.map((d) => d.category);
  const numTodo = data.map((d) => d.todo.length);
  return (
    <>
      <UserHeader />
      <div className="sidebar">
        <div className="mylist">
          <div className="mylistheader">
            <h3>My Lists</h3>
            <AddList />
          </div>
          <ul>
            {categories.map((category, i) => {
              return (
                <li key={i} className="categorylist">
                  <div className="categoryli">{category}</div>{" "}
                  <div className="numtodo">{numTodo[i]}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
