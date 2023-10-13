import "./Button.css";

function Button({ title, onClick, icon }) {
  return (
    <div className="Button">
      <button>{title}</button>
      {icon && <img src={icon} alt="Ícone" />}
    </div>
  );
}

export default Button;
