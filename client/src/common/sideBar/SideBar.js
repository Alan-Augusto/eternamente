import "./SideBar.css";

function SideBar({boards, selectedBoard}) {
  return (
    <div className="SideBar">
      <ul>
        {boards.map((board) => (
          <li key={board.id}>{board.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
