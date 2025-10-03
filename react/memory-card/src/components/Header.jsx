// Header.jsx
import "./../styles/Header.css";  // if you made one

function Header({ score, bestScore }) {
    return (
      <header>
        <h1>Memory Card Game</h1>
        <p>Score: {score} | Best Score: {bestScore}</p>
      </header>
    );
  }
  
  export default Header;
  