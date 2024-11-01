import React from "react";
import "./MealCard.css";

interface Meal {
	image: string;
	name: string;
	description: string;
	rating: number;
	_id: string;
	sides: string[];
	price: number;
}

interface MealCardProps {
	meal: Meal;
	onViewClick?: () => void;
	orderQty?: number;
	extPrice?: number;
	onEditClick?: () => void;
	onRemoveClick?: () => void;
	showViewButton?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({
	meal,
	onViewClick,
	orderQty,
	extPrice,
	onEditClick,
	onRemoveClick,
	showViewButton = true,
}) => {
	return (
		<div className="meal-card">
			<div className="meal-image" style={{ backgroundImage: `url(/assets/${meal.image})` }}></div>
			<h3 className="meal-card-name">{meal.name}</h3>
			<p className="meal-card-sides">
				{meal.sides && meal.sides.length > 0
					? `with ${meal.sides[0]}`
					: "No sides available"}
			</p>
			<div className="meal-card-rating">
				<span className="meal-card-rating-value">{meal.rating}</span>
				<span className="meal-card-star">★★★★★</span>
				<span className="meal-card-rating-count">10</span>
			</div>
			<p className="meal-card-price">${meal.price.toFixed(2)}</p>
			{orderQty !== undefined && extPrice !== undefined && (
				<div className="meal-card-order-details">
					<p>Quantity: {orderQty}</p>
					<p>Subtotal: ${extPrice.toFixed(2)}</p>
					<button className="edit-order-button" onClick={onEditClick}>
						Edit
					</button>
					<button
						className="remove-order-button"
						onClick={onRemoveClick}
					>
						Remove
					</button>
				</div>
			)}
			{showViewButton && onViewClick && (
				<button className="meal-card-view-button" onClick={onViewClick}>
					View
				</button>
			)}
		</div>
	);
};

export default MealCard;
