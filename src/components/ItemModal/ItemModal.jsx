import './ItemModal.css';
import closeIcon from '../../assets/x-modal-close-btn.png';

function ItemModal({ isOpen, onClose, onOverlayClick, card }) {
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
					src={card.link}
					alt={card.name || 'Clothing item'}
					className="itemModal__image"
				/>
				<div className="itemModal__footer">
					<h2 className="itemModal__caption">{card.name}</h2>
					<p className="itemModal__weather">Weather: {card.weather}</p>
				</div>
			</div>
		</div>
	);
}

export default ItemModal;
