import { useState, useEffect } from "react";
import Card from "./Card";
import "./../styles/GameBoard.css";

function GameBoard({ onCardClick }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const urls = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Nature ${i + 1}`,
      img: `https://source.unsplash.com/200x200/?nature&sig=${i + 1}`, // ✅ unique nature image
    }));

    setCards(urls);
  }, []);

  return (
    <div className="game-board">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          img={card.img}           // ✅ pass image URL
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default GameBoard;
