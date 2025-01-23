import React, { useState } from "react";

function App() {
  let [btnBg, setBtnBg] = useState("white");

  function onBtnEnter() {
    setBtnBg("black");
  }

  function onBtnLeave() {
    setBtnBg("white");
  }

  return (
    <div className="container">
      <h1>Hello</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={{ backgroundColor: btnBg }}
        onMouseEnter={onBtnEnter}
        onMouseLeave={onBtnLeave}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
