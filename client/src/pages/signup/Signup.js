import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import Logo from "../../common/logo/Logo";
import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");

  function handleClick() {
    console.log("Nome = ", name);
    console.log("email = ", email);
    console.log("senha = ", password);
    console.log("data = ", date);
  }

  return (
    <div className="Signup">
      <Logo />
      <div className="PopUp">
        <div className="Title">
          <h2>Cadastre-se</h2>
        </div>

        <div className="Form">
          <Input
            type="text"
            title="nome"
            placeholder="digite seu nome..."
            icon="fi fi-rr-user"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Input
            type="date"
            title="data nascimento"
            icon="fi fi-rr-calendar"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button 
            title="finalizar cadastro" 
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
