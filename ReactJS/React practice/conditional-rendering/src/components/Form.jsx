import React from "react";
import LoginInput from "./FormInput";

function LoginForm() {
  return (
    <form className="form">
      <LoginInput type="text" placeholder="Username" />
      <LoginInput type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
