import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import Logo from "../../common/logo/Logo";
import "./Signin.css";

function Signin() {
  return (
    <div className="Signin">
      <Logo/>
      <div className="PopUp">
        <div className="Title">
          <h2>Entrar</h2>
        </div>

        <div className="Form">
          <Input
            type="email"
            title="email"
            placeholder="digite seu email..."
            icon="fi fi-rr-user"
          />
          <Input
            type="password"
            title="senha"
            placeholder="digite sua senha..."
            icon="fi fi-rr-key"
          />
          <Button title="entrar" icon="fi fi-rr-sign-in-alt" />
        </div>
      </div>
    </div>
  );
}

export default Signin;
