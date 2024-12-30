//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import ReactDOM from "react-dom";

let text = "Good Morning";
let color = "red";
let time = new Date().getHours();

if (time >= 12 || time < 18) {
  text = "Good Afternoonies";
  color = "green";
} else if (time >= 18) {
  text = "Good Evening";
  color = "blue";
}

ReactDOM.render(
  <div>
    <h1 style={{ color: color, textAlign: "center" }}>{text}</h1>
  </div>,
  document.getElementById("root")
);
