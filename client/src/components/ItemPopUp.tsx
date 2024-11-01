import React, { useState, useEffect } from "react";
import "./ItemPopUp.css";
import { useUserContext } from "../context/UserContext";

interface Meal {
	image: string;
	name: string;
	description: string;
	rating: number;
	_id: string;
	sides: string[];
	price: number;
	calories: number;
	protein: number;
	fats: number;
	carbs: number;
}

interface ItemPopUpCardProps {
	mealId: string;
	onClose: () => void;
	mode: "add" | "edit";
}

const ItemPopUpCard: React.FC<ItemPopUpCardProps> = ({
	mealId,
	onClose,
	mode,
}) => {
	const [meal, setMeal] = useState<Meal | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { token } = useUserContext();

	useEffect(() => {
		const fetchMealData = async () => {
			try {
				const response = await fetch(
					`http://localhost:4000/items/${mealId}`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch meal data");
				}
				const data = await response.json();
				setMeal(data);
				setLoading(false);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
				setLoading(false);
			}
		};

		fetchMealData();
	}, [mealId]);

	const handleAddToOrder = async () => {
		try {
			const response = await fetch(
				`http://localhost:4000/orders/cart/items/${mealId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error("Failed to add item to cart");
			}
			onClose();
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	const handleUpdateMeal = async () => {
		try {
			const response = await fetch(
				`http://localhost:4000/orders/cart/update/${mealId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						// Include fields to be updated, e.g., qty
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to update item in cart");
			}
			onClose();
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!meal) {
		return null;
	}

	return (
		<div className="main-container">
			<div className="pop-up-container">
				<span className="close-btn" onClick={onClose}>
					X
				</span>
				<div className="img-container">
					<img src={`/assets/${meal.image}`} alt={meal.name} />
				</div>
				<div className="info-container">
					<h2 className="item-name">{meal.name}</h2>
					<p className="item-description">{meal.description}</p>
					<p className="item-price">Price: ${meal.price}</p>
					<div className="rating">
						<span className="star">★</span>
						<span className="star">★</span>
						<span className="star">★</span>
						<span className="star">★</span>
						<span className="star">★</span>
						<span className="rating-count">{meal.rating}</span>
					</div>
					<div className="calorie-smart">Calorie Smart</div>
					<div className="options-container">
						<select className="option-select">
							{meal.sides.map((side) => (
								<option key={side} value={side}>
									With {side}
								</option>
							))}
						</select>
						<div className="option-item servings">
							<span className="option-title">Servings</span>
							<select className="option-select">
								<option value="2 servings">2 servings</option>
							</select>
						</div>
					</div>
					<div className="option-item allergen">
						<span className="option-title">Allergen</span>
						<select className="option-select">
							<option value="No shellfish">No shellfish</option>
						</select>
					</div>
					<div className="nutrition-container">
						<span className="nutrition-title">
							Nutrition per serving
						</span>
						<div className="nutrition-values">
							<span className="nutrition-value">
								Calories: {meal.calories}
							</span>
							<span className="nutrition-value">
								Protein: {meal.protein}g
							</span>
							<span className="nutrition-value">
								Fats: {meal.fats}g
							</span>
							<span className="nutrition-value">
								Carbs: {meal.carbs}g
							</span>
						</div>
					</div>
					<div className="instructions-container">
						<h3 className="instructions-title">Instructions</h3>
						<div className="instruction-item">
							<span className="instruction-type">For oven</span>
							<span className="instruction-detail">
								Preheat to 375°F. Place ventilated meal on a
								sheet pan. Bake 15 to 18 minutes, or until
								heated through. (Do not use a toaster oven.)
							</span>
						</div>
						<div className="instruction-item">
							<span className="instruction-type">
								For Microwave
							</span>
							<span className="instruction-detail">
								Heat on high 2 to 3 minutes, or until heated
								through.
							</span>
						</div>
					</div>
					{mode === "add" ? (
						<button
							className="add-meal-btn"
							onClick={handleAddToOrder}
						>
							Add to Order
						</button>
					) : (
						<button
							className="update-meal-btn"
							onClick={handleUpdateMeal}
						>
							Update Meal
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ItemPopUpCard;
