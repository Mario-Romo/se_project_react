import './ItemModal.css';

function ItemModal({ activeModal, onClose, card }) {
	return (
		<div className={`modal ${activeModal === 'preview' && 'modal_opened'}`}>
			<div className="itemModal__content itemModal__content_type_image">
				<button onClick={onClose} type="button" className="itemModal__close">
					<img src="src/assets/x-modal-close-btn.png" alt="Close button" />
				</button>
				<img src={card.link} alt="" className="itemModal__image" />
				<div className="itemModal__footer">
					<h2 className="itemModal__caption">{card.name}</h2>
					<p className="itemModal__weather">Weather: {card.weather}</p>
				</div>
			</div>
		</div>
	);
}

export default ItemModal;
