import './SideBar.css';
import avatar from '../../assets/avatar.png';
import { NavLink } from 'react-router-dom';

export default function SideBar() {
	// const username = 'Terrence Tegegne'; // Replace with the actual username
	// const avatar = avatar; // Replace with the actual avatar image source

	return (
		<aside className="sidebar">
			<div className="sidebar__profile">
				<NavLink className="sidebar__nav-link" to="/profile">
					<div className="sidebar__user-container">
						<img
							className="sidebar__useravatar"
							src={avatar}
							alt="user avatar"
						/>
						<p className="sidebar__username">Terrence Tegegne</p>
					</div>
				</NavLink>
			</div>
		</aside>
	);
}
