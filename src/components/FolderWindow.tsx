import React, { Dispatch, SetStateAction } from "react";
import "./folderwindow.css";
import { Data } from "../App";
const TopicHeader: React.FC = () => {
  return <div className="topicheader">Personal</div>;
};

interface SideProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}
const selectTodo = (e: any): void => {
  if (e.target.innerText.length > 0) {
    e.target.parentNode.querySelector("span").style.cssText =
      "text-decoration:none";
    e.target.innerHTML = "";
  } else {
    console.log(e.target.parentNode.querySelector("span"));
    e.target.parentNode.querySelector("span").style.cssText =
      "text-decoration:line-through";
    e.target.innerHTML = "&check;";
  }
};

const FolderWindow = (props: SideProps) => {
  const { data, setData } = props;
  return (
    <div className="">
      <TopicHeader />
      <div className="folderwindow">
        <ul className="todo">
          {data[0].todo.map((todo, i) => {
            return (
              <li key={i}>
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
