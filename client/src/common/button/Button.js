import "./Button.css";

function Button({ title, onClick, icon, color, colorText, shadow }) {
  
  const style = {
    background: color ? color : "#f20f99",
    color: colorText ? colorText : "#fffff",
    boxShadow: shadow ? shadow : ""
  };

  return (
    <div className="Button" onClick={onClick} style={style} >
      <p>{title}</p>
      <i class={icon}></i>
    </div>
  );
}

export default Button;
