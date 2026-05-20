import './ModalWithForm.css';

function ModalWithForm({ children, title, activeModal, onClose }) {
	return (
		<div className={`modal ${activeModal === 'add-garment' && 'modal_opened'}`}>
			<div className="modal__content">
				<h2 className="modal__title">{title}</h2>
				<button onClick={onClose} type="button" className="modal__close">
					<img src="src/assets/x-close-btn.png" alt="Close button" />
				</button>
				<form className="modal__form">
					{children}

					<button type="submit" className="modal__submit">
						<img
							src="src/assets/add-garment-btn.png"
							alt="Add garment button"
						/>
					</button>
				</form>
			</div>
		</div>
	);
}

export default ModalWithForm;
