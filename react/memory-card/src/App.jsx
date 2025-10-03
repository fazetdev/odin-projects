import { useState } from "react";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";

function App() {
  // game state
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  // handle card click
  // shuffle cards here later
  const handleCardClick = (cardId) => {
    console.log("Card clicked:", cardId); // 🐛 debug log
    if (clickedCards.includes(cardId)) {
      // ❌ already clicked → reset score
      setScore(0);
      setClickedCards([]);
    } else {
      // ✅ new card → increase score
      const newScore = score + 1;
      setScore(newScore);
      setClickedCards([...clickedCards, cardId]);

      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }
  };

  return (
    <div>
      <Header score={score} bestScore={bestScore} />
      <GameBoard onCardClick={handleCardClick} />
    </div>
  );
}

export default App;
