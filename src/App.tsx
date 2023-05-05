import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useState, Dispatch, SetStateAction } from "react";

// sample data
export type Category = {
  category: string;
  todo: Array<Todo>;
};
type Todo = {
  name: string;
  note: string;
};

export type Data = Array<Category>;
const sample: Data = [
  {
    category: "Personal",
    todo: [
      {
        name: "Walk a dog",
        note: "Kevin needs a extra walk for his weight loss",
      },
      {
        name: "Clean my desk",
        note: "My desk is getting too dirty to be productive",
      },
      { name: "Collect Comics", note: "Need to expand my collections" },
    ],
  },
  {
    category: "Work",
    todo: [
      {
        name: "Send an email",
        note: "Finding a new job",
      },
    ],
  },
];

function App() {
  const [data, setData] = useState(sample);
  const [selected, setSelected] = useState(false);
  const categories: Array<string> = data.map((d) => d["category"]);
  return (
    <div className="App">
      <Sidebar data={data} setData={setData} categories={categories} />
      <Main data={data} setData={setData} />
    </div>
  );
}

export default App;
