import React from "react";
import Form from "./Form";

var userIsRegistered = true;

function App() {
  return (
    <div className="container">
      {userIsRegistered ? (
        <Form text="Login" isRegistered={true} />
      ) : (
        <Form text="Register" isRegistered={false} />
      )}
    </div>
  );
}

export default App;
