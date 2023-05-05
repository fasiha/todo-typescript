import FolderWindow from "./FolderWindow";
import React, { Dispatch, SetStateAction, useState } from "react";
import "./main.css";
import { Data } from "../App";

interface SideProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  selected: number;
}

const Main = (props: SideProps) => {
  const { data, setData, selected } = props;
  const [selected2, setSelected2] = useState(0);

  return (
    <div className="main">
      <FolderWindow
        data={data}
        setData={setData}
        selected={selected}
        selected2={selected2}
        setSelected2={setSelected2}
      />
    </div>
  );
};

export default Main;
