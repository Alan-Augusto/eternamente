import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import Logo from "../../common/logo/Logo";
import React, { useState } from "react";
import http from "../export";
import "./Signin.css";

function Signin({ handleLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credenciais, setCredenciais] = useState("");

  function handleClick() {
    console.log("Verificando credenciais...");
    console.log(email);
    console.log(password);

    http.get(`/signin/?email=${email}`).then((response) => {
      setCredenciais(response.data);

      if (response.data && response.data.length > 0) {
        // Verifique se há dados retornados e se o email e password correspondem
        const user = response.data[0];
        if (user.email === email && user.password === password) {
          console.log("VÁLIDO");
          handleLoginSuccess(user.id);
        } else {
          alert("Credenciais inválidas");
        }
      } else {
        alert("Usuário não encontrado");
      }
    });
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
            title="password"
            placeholder="digite sua password..."
            icon="fi fi-rr-key"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            title="entrar"
            icon="fi fi-rr-sign-in-alt"
            onClick={handleClick}
          />
          <div className="GoToSignUp">
            <p>Nao possui cadastro?</p>
            <a href="http://localhost:3000/signup">Clique Aqui</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
