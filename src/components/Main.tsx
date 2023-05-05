import FolderWindow from "./FolderWindow";
import React, { Dispatch, SetStateAction } from "react";
import "./main.css";
import { Data } from "../App";

interface SideProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  selected: number;
}

const Main = (props: SideProps) => {
  const { data, setData, selected } = props;

  return (
    <div className="main">
      <FolderWindow data={data} setData={setData} selected={selected} />
      <FolderWindow data={data} setData={setData} selected={selected} />
    </div>
  );
};

export default Main;
