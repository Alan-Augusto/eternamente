import './Header.css';

function Header({selectedBoard}) {
  return (
    <div className="Header">
      <img src="./assets/LogoBlack.png" alt="logomarca" />
      <div className="HeaderTitle">
        <p>{selectedBoard}</p>
      </div>
    </div>
  );
}

export default Header;
