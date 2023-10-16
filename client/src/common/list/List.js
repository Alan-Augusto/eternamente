import "./List.css";

function List({ idList, nameList, colorList }) {
  return (
    <div className="List">
      <h3>{nameList}</h3>
    </div>
  );
}

export default List;
