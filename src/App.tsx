import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useState } from "react";

// sample data
type Category = {
  category: string;
  todo: Array<Todo>;
};
type Todo = {
  name: string;
  note: string;
};
const sample: Array<Category> = [
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
  const categories: Array<string> = data.map((d) => d["category"]);
  console.log(categories);
  return (
    <div className="App">
      <Sidebar categories={categories} />
      <Main />
    </div>
  );
}

export default App;
