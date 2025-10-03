import "./../styles/Card.css";

function Card({ id, title, img, onCardClick }) {
  console.log("Card props:", { id, title, img, onCardClick }); // debug

  return (
    <button className="card" onClick={() => onCardClick(id)}>
      <img src={img} alt={title} />  {/* ✅ display image */}
      <p>{title}</p>
    </button>
  );
}

export default Card;
