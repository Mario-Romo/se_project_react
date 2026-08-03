import { useEffect, useState } from 'react';

import './App.css';
import { coordinates, apiKey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import AddItemModal from '../AddItemModal/AddItemModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

import ItemModal from '../ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import Footer from '../Footer/Footer';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import { Routes, Route } from 'react-router-dom';
import { getItems, addItem, removeItem } from '../../utils/api';

function App() {
	/* hooks to get states, used for interactivity */
	const [weatherData, setWeatherData] = useState({
		type: '',
		temp: { F: 999, C: 999 },
		city: '',
		condition: '',
		isDay: false,
	});
	const [activeModal, setActiveModal] = useState('');
	const [selectedCard, setSelectedCard] = useState({});
	const [clothingItems, setClothingItems] = useState([]);
	const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

	/* HANDLERS, USE STATE FROM HOOKS */

	/* handleToggleSwitchChange handles the change of temperature unit */
	const handleToggleSwitchChange = () => {
		setCurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
	};

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

	/* onConfirmDelete opens the 'delete confirmation modal' (when the "Delete item" button is clicked)*/
	const onDeleteItem = (card) => {
		setActiveModal('delete-confirmation');
		setSelectedCard(card);
	};

	/* onConfirmDelete handles the deletion of the item when the user confirms the deletion in the DeleteConfirmationModal */
	const onConfirmDelete = (card) => {
		removeItem(card._id)
			.then(() => {
				// Remove the deleted item from the clothingItems state
				setClothingItems(clothingItems.filter((item) => card._id !== item._id));
				// close the modal after successful deletion
				closeActiveModal();
			})
			.catch(console.error);
	};

	const onAddItem = (inputValues, reset) => {
		const newCardData = {
			name: inputValues.name,
			imageUrl: inputValues.imageUrl,
			weather: inputValues.weatherType,
		};
		addItem(newCardData)
			.then((data) => {
				setClothingItems([data, ...clothingItems]); // update the clothingItems state with the new item
				closeActiveModal(); // close the modal only after successful submission
			})
			.catch(console.error);

		reset(); // reset the form fields after submission
	};

	/* this effect uses the user's coordinates to request weather data from API it also loads upon component mount */
	useEffect(() => {
		getWeather(coordinates, apiKey)
			.then((data) => {
				const filteredData = filterWeatherData(data);
				setWeatherData(filteredData);
			})
			.catch(console.error);

		getItems()
			.then((data) => {
				setClothingItems(data.reverse());
			})
			.catch(console.error);
	}, []);

	// TO DO:
	// - add a delete button to the preview modal
	// - declare a handler in App.jsx for it (i.e.,deleteItemHandler)
	// - pass handler to preview modal
	// - inside preview modal, pass the id as an argument to the handler (use the handler pattern found in ItemCard)
	// inside the handler
	// - call the removeItem function from api.js, pass it the ID (not the object!)
	// - in the .then() remove the item from the array
	// - how? filter

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

	/* AddItemModal and ItemModal are rendered outside of the page__content div so that they can be displayed on top of the entire page, not just the content area. This is important because the modals need to be displayed on top of the entire page, not just the content area. */
	return (
		<CurrentTemperatureUnitContext.Provider
			value={{ currentTemperatureUnit, handleToggleSwitchChange }}
		>
			<div className="page">
				<div className="page__content">
					<Header handleAddClick={handleAddClick} weatherData={weatherData} />

					<Routes>
						<Route
							path="/"
							element={
								<Main
									weatherData={weatherData}
									handleCardClick={handleCardClick}
									clothingItems={clothingItems}
								/>
							}
						/>
						<Route
							path="/profile"
							element={
								<Profile
									handleAddClick={handleAddClick}
									onCardClick={handleCardClick}
									clothingItems={clothingItems}
								/>
							}
						/>
					</Routes>

					<Footer />
				</div>

				<AddItemModal
					isOpen={activeModal === 'add-garment'}
					onClose={closeActiveModal}
					onOverlayClick={handleOverlayClick}
					onAddItem={onAddItem}
				/>

				<ItemModal
					isOpen={activeModal === 'preview'}
					onClose={closeActiveModal}
					onOverlayClick={handleOverlayClick}
					onDeleteItem={onDeleteItem}
					card={selectedCard}
				/>

				<DeleteConfirmationModal
					isOpen={activeModal === 'delete-confirmation'}
					onClose={closeActiveModal}
					onOverlayClick={handleOverlayClick}
					onConfirmDelete={onConfirmDelete}
					card={selectedCard}
				/>
			</div>
		</CurrentTemperatureUnitContext.Provider>
	);
}

export default App;
