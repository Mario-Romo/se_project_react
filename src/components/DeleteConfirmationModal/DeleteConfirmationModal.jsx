import './DeleteConfirmationModal.css';

import closeIcon from '../../assets/confirm-delete-close-button.png';

function DeleteConfirmationModal({
	isOpen,
	onClose,
	onOverlayClick,
	onConfirmDelete,
	card,
}) {
	return (
		<div
			className={`modal ${isOpen ? 'modal_opened' : ''}`}
			onClick={onOverlayClick}
		>
			<div className="DeleteConfirmationModal__content">
				<button
					onClick={onClose}
					type="button"
					className="DeleteConfirmationModal__close"
				>
					<img src={closeIcon} alt="Close button" />
				</button>
				<p className="DeleteConfirmationModal__message">
					Are you sure you want to delete this item? This action is
					irreversible.
				</p>
				<div className="DeleteConfirmationModal__actionButtons">
					<button
						onClick={() => onConfirmDelete(card)}
						type="button"
						className="DeleteConfirmationModal__button DeleteConfirmationModal__button_type_confirm"
					>
						Yes, delete item
					</button>
					<button
						onClick={onClose}
						type="button"
						className="DeleteConfirmationModal__cancelButton DeleteConfirmationModal__cancelButton_type_confirm"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteConfirmationModal;
