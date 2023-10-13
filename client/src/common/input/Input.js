import "./Input.css";

function Input({ title, type, placeholder, icon, value,  onChange }) {
  return (
    <div className="Input">
      <div className="InputTitle">
        <h3>{title}</h3>
      </div>
      <div className="InputBox">
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}/>
        <i class={icon}></i>
      </div>
    </div>
  );
}

export default Input;
