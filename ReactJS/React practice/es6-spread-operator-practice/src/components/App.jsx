import React, { useState } from "react";

function App() {
  let [listItem, editListItem] = useState("");
  let [listItems, editList] = useState([]);

  function handleChange(event) {
    let value = event.target.value;
    editListItem(value);
  }

  function handleClick(event) {
    let newList = [...listItems, listItem];
    editListItem("");
    editList(newList);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={listItem} />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {listItems.map((listItem) => (
            <li>{listItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
