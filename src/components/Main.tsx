import FolderWindow from "./FolderWindow";
import TodoWindow from "./TodoWindow";
import React, { Dispatch, SetStateAction, useState } from "react";
import "./main.css";
import { Data } from "../App";

interface SideProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  selected: number;
  selected2: number;
  setSelected2: Dispatch<SetStateAction<number>>;
}

const Main = (props: SideProps) => {
  const { data, setData, selected, selected2, setSelected2 } = props;

  return (
    <div className="main">
      <FolderWindow
        data={data}
        setData={setData}
        selected={selected}
        selected2={selected2}
        setSelected2={setSelected2}
      />
      <TodoWindow
        data={data}
        setData={setData}
        selected={selected}
        selected2={selected2}
      />
    </div>
  );
};

export default Main;
