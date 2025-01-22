import React from "react";
import MyForm from "./Form";

let isLoggedIn = true;

function displayConditionally() {
  if (isLoggedIn) {
    return <h1>Hello</h1>;
  } else {
    return <MyForm />;
  }
}

function App() {
  return (
    <div className="container">{isLoggedIn ? <h1>Hello</h1> : <MyForm />}</div>
  );
}

export default App;
