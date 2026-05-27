import { useEffect, useState } from 'react';

import './App.css';
import {
	coordinates,
	apiKey,
	defaultClothingItems,
} from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import Footer from '../Footer/Footer';

function App() {
	/* hooks to get states, used for interactivity */
	const [weatherData, setWeatherData] = useState({
		type: '',
		temp: { F: 999 },
		city: '',
	});
	const [activeModal, setActiveModal] = useState('');
	const [selectedCard, setSelectedCard] = useState({});
	const [clothingItems, setClothingItems] = useState(defaultClothingItems);

	/* HANDLERS, USE STATE FROM HOOKS */
	/* handleAddClick opens the 'add-garment' modal (when 'Add garment' btn is clicked)*/
	const handleAddClick = () => {
		setActiveModal('add-garment');
	};
	/* closes ALL opened modals*/
	const closeActiveModal = () => {
		setActiveModal('');
	};
	/* handleAddGarmentSubmit handles closing of the Add Garment modal */
	const handleAddGarmentSubmit = () => {
		closeActiveModal();
	};

	/* handles closing of modals by clicking overlay (anywhere outside the modal) */
	const handleOverlayClick = (event) => {
		if (event.target === event.currentTarget) {
			closeActiveModal();
		}
	};

	/* handleCardClick opens the 'preview modal' (when clothing cards are clicked)*/
	const handleCardClick = (card) => {
		setActiveModal('preview');
		setSelectedCard(card);
	};

	/* this effect uses my coordinates to request weather data from API */
	useEffect(() => {
		getWeather(coordinates, apiKey)
			.then((data) => {
				const filteredData = filterWeatherData(data);
				setWeatherData(filteredData);
			})
			.catch(console.error);
	}, []);

	/* this effect closes modals using ESC key*/
	useEffect(() => {
		/* define handleKeyDown as a function inside useEffect so it can be reused and work with clean-up function later*/
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				closeActiveModal();
			}
		};
		/* add event listener when the effect runs */
		document.addEventListener('keydown', handleKeyDown);
		/* return clean-up function that removes event listener */
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [activeModal]);

	return (
		<div className="page">
			<div className="page__content">
				<Header handleAddClick={handleAddClick} weatherData={weatherData} />
				<Main
					weatherData={weatherData}
					handleCardClick={handleCardClick}
					clothingItems={clothingItems}
				/>
				<Footer />
			</div>
			<ModalWithForm
				title="New garment"
				name="add-garment"
				isOpen={activeModal === 'add-garment'}
				onClose={closeActiveModal}
				onOverlayClick={handleOverlayClick}
				onSubmit={handleAddGarmentSubmit}
				buttonText="Add garment"
			>
				<label htmlFor="name" className="modal__label modal__nameLabel">
					Name {''}
					<input
						type="text"
						required
						className="modal__input"
						id="name"
						placeholder="Name"
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
							name="weather"
							value="hot"
							className="modal__radio-input"
						/>{' '}
						Hot
					</label>

					<label
						htmlFor="warm"
						className="modal__label modal__label_type_radio"
					>
						<input
							id="warm"
							type="radio"
							name="weather"
							value="warm"
							className="modal__radio-input"
						/>{' '}
						Warm
					</label>

					<label
						htmlFor="cold"
						className="modal__label modal__label_type_radio"
					>
						<input
							id="cold"
							type="radio"
							name="weather"
							value="cold"
							className="modal__radio-input"
						/>{' '}
						Cold
					</label>
				</fieldset>
			</ModalWithForm>
			<ItemModal
				isOpen={activeModal === 'preview'}
				card={selectedCard}
				onClose={closeActiveModal}
				onOverlayClick={handleOverlayClick}
			/>
		</div>
	);
}

export default App;
