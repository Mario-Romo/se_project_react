import { useEffect, useState } from 'react';

import './App.css';
import { coordinates, APIkey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';

function App() {
	/* hooks to get states, used for interactivity */
	const [weatherData, setWeatherData] = useState({
		type: '',
		temp: { F: 999 },
		city: '',
	});
	const [activeModal, setActiveModal] = useState('');
	const [selectedCard, setSelectedCard] = useState({});

	/* HANDLERS, USE STATE FROM HOOKS */
	/* handleAddClick opens the 'add-garment' modal (when 'Add garment' btn is clicked)*/
	const handleAddClick = () => {
		setActiveModal('add-garment');
	};
	/* closes ALL opened modals*/
	const closeActiveModal = () => {
		setActiveModal('');
	};
	/* handleCardClick opens the 'preview modal' (when clothing cards are clicked)*/
	const handleCardClick = (card) => {
		setActiveModal('preview');
		setSelectedCard(card);
	};

	useEffect(() => {
		getWeather(coordinates, APIkey)
			.then((data) => {
				const filteredData = filterWeatherData(data);
				setWeatherData(filteredData);
			})
			.catch(console.error);
	}, []);

	return (
		<div className="page">
			<div className="page__content">
				<Header handleAddClick={handleAddClick} weatherData={weatherData} />
				<Main weatherData={weatherData} handleCardClick={handleCardClick} />
				<footer className="footer">
					{
						<>
							<span>Developed by Mario Romo</span>
							<span>2026</span>
						</>
					}
				</footer>
			</div>
			<ModalWithForm
				title="New garment"
				activeModal={activeModal}
				onClose={closeActiveModal}
			>
				<label htmlFor="name" className="modal__label modal__nameLabel">
					Name {''}
					<input
						type="text"
						className="modal__input"
						id="name"
						placeholder="Name"
					/>
				</label>
				<label htmlFor="imageUrl" className="modal__label modal__imageLabel">
					Image {''}
					<input
						type="url"
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
						<input id="hot" type="radio" className="modal__radio-input" /> Hot
					</label>

					<label
						htmlFor="warm"
						className="modal__label modal__label_type_radio"
					>
						<input id="warm" type="radio" className="modal__radio-input" /> Warm
					</label>

					<label
						htmlFor="cold"
						className="modal__label modal__label_type_radio"
					>
						<input id="cold" type="radio" className="modal__radio-input" /> Cold
					</label>
				</fieldset>
			</ModalWithForm>
			<ItemModal
				activeModal={activeModal}
				card={selectedCard}
				onClose={closeActiveModal}
			/>
		</div>
	);
}

export default App;
