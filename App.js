import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import "./App.css";
import { DebounceInput } from "react-debounce-input";

function App() {
  const [serch, setSerch] = useState([]);
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  // using loadsh ( debounce )

  const handle_change_using_lodashDebounce = debounce((e) => {
    const { value } = e.target;
    fetch(`https://demo.dataverse.org/api/search?q=${value}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json), setSerch(json.data.items);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, 2000); // setlodash debounc timer

  // this function for pure Debounce Concept
  const handleChange = (e) => {
    const { value } = e.target;

    fetch(`https://demo.dataverse.org/api/search?q=${value}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json), setSerch(json.data.items);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const optimizeVersion = useCallback(debounce(handleChange));

  return (
    <div className="App">
      <input type="text" onChange={optimizeVersion}></input>
      <DebounceInput
        min={2}
        debounceTimeout={5000}
        onChange={handleChange}
      ></DebounceInput>

      {serch.map((item) => {
        return (
          <div>
            <li>{item.name}</li>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}

export default App;
