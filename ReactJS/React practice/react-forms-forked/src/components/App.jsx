import React, { useState } from "react";

function App() {
  let [name, setName] = useState("");
  let [headingText, changeNameText] = useState("");

  function handleSubmit(event) {
    changeNameText(name);
    event.preventDefault();
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div className="container">
      <h1>Hello {headingText}</h1>
      <form action="/" method="get" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="What's your name?"
          value={name}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
