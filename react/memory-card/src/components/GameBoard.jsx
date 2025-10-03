import PropTypes from 'prop-types';
import Card from './Card';
import './../styles/GameBoard.css';

function GameBoard({ cards, onCardClick }) {
  return (
    <div className="game-board">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          img={card.img}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}

GameBoard.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default GameBoard;
