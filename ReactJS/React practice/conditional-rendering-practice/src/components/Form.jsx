import React from "react";

function Form(props) {
  return (
    <form className="form">
      {props.isRegistered ? (
        <div>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
        </div>
      ) : (
        <div>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Confirm Password" />
        </div>
      )}
      <button type="submit">{props.text}</button>
    </form>
  );
}

export default Form;
