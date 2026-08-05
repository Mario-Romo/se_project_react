import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';

const AddItemModal = ({ isOpen, onClose, onAddItem, onOverlayClick }) => {
	const defaultValues = {
		name: '',
		imageUrl: '',
		weatherType: '',
	};

	const { values, handleChange, reset } = useForm(defaultValues);

	// this function handles the form submission
	function handleSubmit(evt) {
		evt.preventDefault();
		onAddItem(values, reset);
	}

	return (
		<ModalWithForm
			title="New garment"
			name="add-garment"
			isOpen={isOpen}
			onClose={onClose}
			onOverlayClick={onOverlayClick}
			onSubmit={handleSubmit}
		>
			<label htmlFor="name" className="modal__label modal__nameLabel">
				Name {''}
				<input
					type="text"
					className="modal__input"
					id="name"
					name="name"
					placeholder="Name"
					required
					minLength="1"
					maxLength="30"
					value={values.name}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor="imageUrl" className="modal__label modal__imageLabel">
				Image {''}
				<input
					type="url"
					required
					className="modal__input"
					id="imageUrl"
					placeholder="Image URL"
					name="imageUrl"
					value={values.imageUrl}
					onChange={handleChange}
				/>
			</label>
			<fieldset className="modal__radio-buttons">
				<legend className="modal__label modal__legend">
					Select the weather type:
				</legend>

				<label htmlFor="hot" className="modal__label modal__label_type_radio">
					<input
						id="hot"
						type="radio"
						required
						className="modal__radio-input"
						name="weatherType"
						value={'hot'}
						onChange={handleChange}
						checked={values.weatherType === 'hot'}
					/>{' '}
					Hot
				</label>

				<label htmlFor="warm" className="modal__label modal__label_type_radio">
					<input
						id="warm"
						type="radio"
						required
						className="modal__radio-input"
						name="weatherType"
						value={'warm'}
						onChange={handleChange}
						checked={values.weatherType === 'warm'}
					/>{' '}
					Warm
				</label>

				<label htmlFor="cold" className="modal__label modal__label_type_radio">
					<input
						id="cold"
						type="radio"
						required
						className="modal__radio-input"
						name="weatherType"
						value={'cold'}
						onChange={handleChange}
						checked={values.weatherType === 'cold'}
					/>{' '}
					Cold
				</label>
			</fieldset>
		</ModalWithForm>
	);
};

export default AddItemModal;
