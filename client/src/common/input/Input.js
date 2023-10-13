import "./Input.css";

function Input({ title, type, placeholder, icon }) {
  return (
    <div className="Input">
      <div className="InputTitle">
        <h3>{title}</h3>
      </div>
      <div className="InputBox">
        <input type={type} placeholder={placeholder} />
        <i class={icon}></i>
      </div>
    </div>
  );
}

export default Input;
