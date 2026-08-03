import './ItemModal.css';
import closeIcon from '../../assets/x-modal-close-btn.png';

function ItemModal({ isOpen, onClose, onOverlayClick, onDeleteItem, card }) {
	if (card == null) {
		return null;
	}
	return (
		<div
			className={`modal ${isOpen ? 'modal_opened' : ''}`}
			onClick={onOverlayClick}
		>
			<div className="itemModal__content itemModal__content_type_image">
				<button onClick={onClose} type="button" className="itemModal__close">
					<img src={closeIcon} alt="Close button" />
				</button>
				<img
					src={card.imageUrl}
					alt={card.name || 'Clothing item'}
					className="itemModal__image"
				/>
				<div className="itemModal__footer">
					<h2 className="itemModal__caption">{card.name}</h2>

					<button
						onClick={() => onDeleteItem(card)}
						type="button"
						className="itemModal__deleteButton"
					>
						Delete item
					</button>
					<p className="itemModal__weather">Weather: {card.weather}</p>
				</div>
			</div>
		</div>
	);
}

export default ItemModal;
