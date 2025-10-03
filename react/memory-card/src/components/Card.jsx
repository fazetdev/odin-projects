import PropTypes from 'prop-types';
import './../styles/Card.css';

function Card({ id, title, img, onCardClick }) {
  return (
    <button className="card" onClick={() => onCardClick(id)}>
      <img
        src={img}
        alt={title}
        onError={(e) => {
          e.target.src = 'https://picsum.photos/200/200?random=0'; // Fallback image
          e.target.nextSibling.textContent = 'Image failed to load'; // Mobile debug
        }}
      />
      <p>{title}</p>
    </button>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default Card;
