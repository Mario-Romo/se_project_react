import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';

export default function ClothesSection({
	clothingItems,
	onCardClick,
	handleAddClick,
}) {
	return (
		<div className="clothes-section">
			<div className="clothes-section__row">
				<p className="clothes-section__text">Your items</p>
				<button onClick={handleAddClick} className="clothes-section__button">
					+ Add new
				</button>
			</div>
			<ul className="clothes-section__items">
				{clothingItems.map((item) => {
					return (
						<ItemCard key={item._id} item={item} onCardClick={onCardClick} />
					);
				})}
			</ul>
		</div>
	);
}
