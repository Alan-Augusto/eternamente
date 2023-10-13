import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import Logo from "../../common/logo/Logo";
import "./Signup.css";

function Signup() {
  return (
    <div className="Signup">
      <Logo/>
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
          />
          <Input
            type="email"
            title="email"
            placeholder="digite seu email..."
            icon="fi fi-rr-at"
          />
          <Input
            type="password"
            title="senha"
            placeholder="digite sua senha..."
            icon="fi fi-rr-key"
          />
          <Input
            type="date"
            title="data nascimento"
            icon="fi fi-rr-calendar"
          />
          <Button title="finalizar cadastro" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
