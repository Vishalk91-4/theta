import React, { useState, useEffect } from "react";
import "./BrowsePopUp";
import { useUserContext } from "../../context/UserContext";

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

interface BrowsePopUpProps {
	mealId: string;
	onClose: () => void;
	mode: "add" | "edit";
}

const BrowsePopUp: React.FC<BrowsePopUpProps> = ({
	mealId,
	onClose,
	mode,
}) => {
	const [meal, setMeal] = useState<Meal | null>(null);

	return (
		<></>
	);
};

export default BrowsePopUp;
