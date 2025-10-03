import { useState, useEffect } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate 12 cards with Lorem Picsum images
    const urls = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Image ${i + 1}`,
      img: `https://picsum.photos/200/200?random=${i + 1}`,
    }));
    setCards(urls);
    setLoading(false);
  }, []);

  const shuffleCards = () => {
    setCards((prevCards) => {
      const array = [...prevCards];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Fisher-Yates shuffle
      }
      return array;
    });
  };

  useEffect(() => {
    if (!loading) {
      shuffleCards(); // Shuffle after cards load
    }
  }, [loading]);

  const handleCardClick = (cardId) => {
    if (clickedCards.includes(cardId)) {
      setScore(0);
      setClickedCards([]);
      shuffleCards();
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setClickedCards([...clickedCards, cardId]);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
      shuffleCards();
    }
  };

  if (loading) {
    return <div>Loading cards...</div>;
  }

  return (
    <div>
      <Header score={score} bestScore={bestScore} />
      <GameBoard cards={cards} onCardClick={handleCardClick} />
    </div>
  );
}

export default App;
