import './ModalWithForm.css';
import closeIcon from '../../assets/x-close-btn.png'

function ModalWithForm({
	children,
	title,
	name,
	isOpen,
	onClose,
	onOverlayClick,
	onSubmit,
	buttonText,
}) {
	return (
		<div
			className={`modal modal_type_${name} ${isOpen ? 'modal_opened' : ''}`}
			onClick={onOverlayClick}
		>
			<div className="modal__content">
				<h2 className="modal__title">{title}</h2>
				<button onClick={onClose} type="button" className="modal__close">
					<img src={closeIcon} alt="Close button" />
				</button>
				<form className="modal__form" name={name} onSubmit={onSubmit}>
					{children}

					<button type="submit" className="modal__submit">
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
}

export default ModalWithForm;
