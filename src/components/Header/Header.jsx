import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { NavLink } from 'react-router-dom';

function Header({ handleAddClick, weatherData }) {
	const currentDate = new Date().toLocaleString('default', {
		month: 'long',
		day: 'numeric',
	});

	return (
		<header className="header">
			<NavLink to="/">
				<img className="header__logo" src={logo} alt="WTWR logo" />
			</NavLink>
			<p className="header__date-and-location">
				{currentDate}, {weatherData.city}
			</p>
			<ToggleSwitch />
			<button
				onClick={handleAddClick}
				type="button"
				className="header__add-clothes-btn"
			>
				+ Add clothes
			</button>
			<NavLink className="header__nav-link" to="/profile">
				<div className="header__user-container">
					<p className="header__username">Terrence Tegegne</p>
					<img className="header__useravatar" src={avatar} alt="user avatar" />
				</div>
			</NavLink>
		</header>
	);
}

export default Header;
