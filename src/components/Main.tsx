import FolderWindow from "./FolderWindow";
import React, { Dispatch, SetStateAction } from "react";
import "./main.css";
import { Data } from "../App";

interface SideProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}

const Main = (props: SideProps) => {
  const { data, setData } = props;
  return (
    <div className="main">
      <FolderWindow data={data} setData={setData} />
      <FolderWindow data={data} setData={setData} />
    </div>
  );
};

export default Main;
