import "./Button.css";

function Button({ title, onClick, icon }) {
  return (
    <div className="Button" onClick={onClick}>
      <p>{title}</p>
      <i class={icon}></i>
    </div>
  );
}

export default Button;
