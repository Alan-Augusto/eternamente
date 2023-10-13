import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import Logo from "../../common/logo/Logo";
import React, { useState } from "react";
import "./Signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleClick() {
    console.log("email = ", email);
    console.log("senha = ", password);
  }

  return (
    <div className="Signin">
      <Logo />
      <div className="PopUp">
        <div className="Title">
          <h2>Entrar</h2>
        </div>

        <div className="Form">
          <Input
            type="email"
            title="email"
            placeholder="digite seu email..."
            icon="fi fi-rr-at"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            title="senha"
            placeholder="digite sua senha..."
            icon="fi fi-rr-key"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            title="entrar"
            icon="fi fi-rr-sign-in-alt"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
