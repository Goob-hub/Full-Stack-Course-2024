import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  function handleChange(event) {
    let { name, value } = event.target;

    setContact((prevVal) => {
      let copy = { ...prevVal };

      switch (name) {
        case "email":
          return {
            fName: prevVal.fName,
            lName: prevVal.lName,
            email: value,
          };
          break;
        case "lName":
          return {
            fName: prevVal.fName,
            lName: value,
            email: prevVal.email,
          };
          break;
        case "fName":
          return {
            fName: value,
            lName: prevVal.lName,
            email: prevVal.email,
          };
          break;

        default:
          return copy;
          break;
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="fName"
          placeholder="First Name"
          value={contact.fName}
        />
        <input
          onChange={handleChange}
          name="lName"
          placeholder="Last Name"
          value={contact.lName}
        />
        <input
          onChange={handleChange}
          name="email"
          placeholder="Email"
          value={contact.email}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
