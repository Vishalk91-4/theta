import React, { useState, useEffect } from "react";
import MealCard from "./MealCard";
import ItemPopUpCard from "./ItemPopUp";
import "./MealList.css";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
interface MealData {
	image: string;
	name: string;
	description: string;
	rating: number;
	_id: string;
	sides: string[];
	price: number;
}

interface CartItem {
	_id: string;
	qty: number;
	item: MealData;
	extPrice: number;
}

interface Cart {
	lineItems: CartItem[];
	orderTotal: number;
	totalQty: number;
}

interface MealListProps {
	nextStep: () => void;
}

const MealList: React.FC<MealListProps> = ({ nextStep }) => {
	const [meals, setMeals] = useState<MealData[]>([]);
	const [showFullMenu, setShowFullMenu] = useState(false);
	const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
	const [cart, setCart] = useState<Cart | null>(null);
	const [loadingCart, setLoadingCart] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [mode, setMode] = useState<"add" | "edit">("add");
	const { token } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		fetch("http://localhost:4000/items/")
			.then((response) => response.json())
			.then((data) => setMeals(data));
	}, []);

	useEffect(() => {
		fetchCart();
	}, []);

	const fetchCart = async () => {
		try {
			const response = await fetch("http://localhost:4000/orders/cart", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to fetch cart data");
			}
			const data = await response.json();
			setCart(data);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		} finally {
			setLoadingCart(false);
		}
	};

	const handleViewFullMenu = () => {
		setShowFullMenu(true);
	};

	const handleViewClick = (mealId: string) => {
		setSelectedMealId(mealId);
		setMode("add");
	};

	const handleEditClick = (mealId: string) => {
		setSelectedMealId(mealId);
		setMode("edit");
	};

	const handleRemoveClick = async (mealId: string) => {
		try {
			const response = await fetch(
				`http://localhost:4000/orders/cart/items/${mealId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error("Failed to remove item from cart");
			}
			const data = await response.json();
			setCart(data);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	const handleClosePopUp = () => {
		setSelectedMealId(null);
		fetchCart(); // Refresh the cart when the popup is closed
	};

	if (loadingCart) {
		return <div>Loading cart...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const submitOrder = () => {
		nextStep();
		navigate("/checkout");
	};

	return (
		<div className="meal-list-container">
			<p className="meal-list-title">Choose your meals</p>
			<p className="meal-list-my-order">My Order</p>
			{cart && cart.lineItems && cart.lineItems.length > 0 && (
				<div className="meal-cards-grid">
					{cart.lineItems.map((item) => (
						<MealCard
							key={item._id}
							meal={item.item}
							orderQty={item.qty}
							extPrice={item.extPrice}
							onEditClick={() => handleEditClick(item.item._id)}
							onRemoveClick={() =>
								handleRemoveClick(item.item._id)
							}
							showViewButton={false}
						/>
					))}
				</div>
			)}
			<div className="my-order-total">
				<p>
					Total: $
					{cart?.orderTotal ? cart.orderTotal.toFixed(2) : 0.0}
				</p>
				<button
					className="continue-billing-button"
					onClick={() => submitOrder()}
				>
					Continue To Billing
				</button>
			</div>
			<p className="meal-list-subtitle">Choose 3 meals from below</p>
			<p className="meal-list-recommendation">
				Coming Soon; our AI Sue Chef's suggested meals for you!
			</p>
			{/* <p className="meal-list-preferences">
				Your preferences: No shellfish, Calorie smart, 2 servings, 3
				deliveries per week
			</p> */}
			<div className="meal-cards-grid">
				{showFullMenu
					? meals.map((meal: MealData) => (
							<MealCard
								key={meal._id}
								meal={meal}
								onViewClick={() => handleViewClick(meal._id)}
								showViewButton={true}
							/>
					))
					: meals
							.slice(0, 6)
							.map((meal: MealData) => (
								<MealCard
									key={meal._id}
									meal={meal}
									onViewClick={() =>
										handleViewClick(meal._id)
									}
									showViewButton={true}
								/>
							))}
			</div>
			{meals.length > 6 && !showFullMenu && (
				<button
					className="meal-list-button"
					onClick={handleViewFullMenu}
				>
					View Full Menu
				</button>
			)}
			{selectedMealId && (
				<ItemPopUpCard
					mealId={selectedMealId}
					onClose={handleClosePopUp}
					mode={mode}
				/>
			)}
		</div>
	);
};

export default MealList;
