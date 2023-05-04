import React from "react";
import "./folderwindow.css";

const TopicHeader: React.FC = () => {
  return <div className="topicheader">Personal</div>;
};
const FolderWindow: React.FC = () => {
  return (
    <div className="">
      <TopicHeader />
      <div className="folderwindow">Hello</div>;
    </div>
  );
};

export default FolderWindow;
