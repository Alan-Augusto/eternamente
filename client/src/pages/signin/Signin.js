import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import "./Signin.css";

function Signin() {
  return (
    <div className="Signin">
      <div className="PopUp">
        <div className="title">
          <h2>Entre</h2>
        </div>

        <div className="form">
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
          <Button title="entrar" />
        </div>
      </div>
    </div>
  );
}

export default Signin;
