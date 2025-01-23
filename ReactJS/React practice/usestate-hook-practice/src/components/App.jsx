import React, { useState } from "react";

function App() {
  let [time, setTime] = useState(new Date().toLocaleTimeString());

  function updateTimeEverySec() {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }

  updateTimeEverySec();

  return (
    <div className="container">
      <h1>{time}</h1>
      <button>Get Time</button>
    </div>
  );
}

export default App;
