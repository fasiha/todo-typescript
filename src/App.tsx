import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useState, Dispatch, SetStateAction } from "react";

// sample data
export type Category = {
  category: string;
  todo: Array<Todo>;
};
export type Todo = {
  name: string;
  note: string;
};

export type Data = Array<Category>;

// retrieve data from the local storage
const retrievedArray: string | null = localStorage.getItem("data");

let d: Data;
if (retrievedArray) {
  d = JSON.parse(retrievedArray);
} else {
  d = [
    {
      category: "Personal",
      todo: [
        {
          name: "Walk a dog",
          note: "Kevin needs an extra walk for his weight loss",
        },
        {
          name: "Clean my desk",
          note: "My desk is getting too dirty to be productive",
        },
        { name: "Collect Comics", note: "Need to expand my comic collections" },
      ],
    },
    {
      category: "Work",
      todo: [
        {
          name: "Send job applications",
          note: "To find a new job",
        },
        {
          name: "Prepare a presentation",
          note: "Need to make a slide show",
        },
      ],
    },
    {
      category: "Travel",
      todo: [
        {
          name: "Get a Passport",
          note: "Prepare documents to apply for a new passport",
        },
        {
          name: "Book a flight",
          note: "Need to keep an eye on flight ticket prices around October",
        },
      ],
    },
  ];
}

function App() {
  const [data, setData] = useState(d);
  const [selected, setSelected] = useState(0);
  const [selected2, setSelected2] = useState(0);
  const categories: Array<string> = data.map((d) => d["category"]);
  // to make sure if it was saved

  window.addEventListener("unload", function (event) {
    localStorage.setItem("data", JSON.stringify(data));
  });

  return (
    <div className="App">
      <Sidebar
        data={data}
        setData={setData}
        selected={selected}
        setSelected={setSelected}
        categories={categories}
        setSelected2={setSelected2}
      />
      <Main
        data={data}
        setData={setData}
        selected={selected}
        selected2={selected2}
        setSelected2={setSelected2}
      />
    </div>
  );
}

export default App;
