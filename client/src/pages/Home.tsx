import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import background from '../assets/home-bg-final.png';
import home from '../assets/Hero-container.png';
import ai from '../assets/preferences-ai-picks.png';
import browse from '../assets/browse-delicious-meals.png';
import delivery from '../assets/fresh-delivery-easy-cooking.png';
import foodDish from '../assets/fooddish.png';
import proPic from '../assets/willowclark.png';

const categories = [
  'Vegetarian',
  'Low Carb',
  'Gluten Free',
  'High Protein',
  'Family Size',
  'Top Shelf',
  'À la Carte'
];

const mealsData = [
  {
    name: "Quinoa Salad",
    image: "quinoa-salad@2x.png",
    category: categories[0],
    price: 10.99,
    description: "A healthy and delicious quinoa salad with fresh vegetables.",
    calories: 350,
    protein: 10,
    carbs: 45,
    fats: 15
  },
  {
    name: "Grilled Chicken Salad",
    image: "grilled-chicken-salad@2x.png",
    category: categories[1],
    price: 10.99,
    description: "Grilled chicken breast served over a bed of fresh greens.",
    calories: 350,
    protein: 35,
    carbs: 10,
    fats: 20
  },
  {
    name: "Beef and Broccoli Stir-Fry",
    image: "beef-and-broccoli-stir-fry.png",
    category: categories[1],
    price: 10.99,
    description: "Tender beef stir-fried with fresh broccoli in a savory sauce.",
    calories: 400,
    protein: 30,
    carbs: 15,
    fats: 25
  }
];

const Home: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState<any | null>(null);

  const openMealPopup = (meal: any) => {
    setSelectedMeal(meal);
  };

  const closeMealPopup = () => {
    setSelectedMeal(null);
  };

  return (
    <div className='home-container'>
      <img className='home-bg-image' src={background} />
      <div className="hero-container">
        <img src={home} alt="Home" className="home-image" />
        <div className="home-text">
          <h1>A Chef In Every Tasty Meal Box</h1>
          <h2>Each Chef’s Choice meal is perfectly portioned for any age. Our fully-prepared dishes are delivered fresh and ready to enjoy in under 5 minutes, offering a delightful and convenient dining experience for everyone.</h2>
          <Link to="/login">
            <button className="get-started-button">Get Started</button>
          </Link>
        </div>
      </div>
      <div className="home-list">
        <p className="list-text">How it Works</p>
        <div className="list-images">
          <div className="image-container">
            <img src={ai} alt="Preferences & AI Picks" />
            <h2>Preferences & AI Picks</h2>
            <h3>Set your diet (vegan, etc.) and answer a few taste questions. Our AI creates personalized meals just for you!</h3>
          </div>
          <div className="image-container">
            <img src={browse} alt="Browse Delicious Meals" />
            <h2>Browse Delicious Meals</h2>
            <h3>Explore chef-crafted meals recommended by AI based on your profile. See descriptions, photos & nutrition info.</h3>
          </div>
          <div className="image-container">
            <img src={delivery} alt="Fresh Delivery, Easy Cooking" />
            <h2>Fresh Delivery, Easy Cooking</h2>
            <h3>Relax, we handle groceries & prep. Fresh, portioned meals arrive with easy recipes. Enjoy delicious food, hassle-free!</h3>
          </div>
        </div>
        <div className="menu-list">
          <p className="list-text">Browse our meals</p>
          <h3>No matter your food preferences, Chef’s Choice offers the meals you crave with our flexible pre-made menu of chef-crafted, dietitian-approved options. Here's a small taste!</h3>
          <div className="list-images">
            {mealsData.map((meal, index) => (
              <div className="card" key={index}>
                <img src={`/assets/${meal.image}`} alt={meal.name} className="card-image" />
                <div className="card-content">
                  <h2>{meal.name}</h2>
                  <h3>{meal.description}</h3>
                  <button className="view-button" onClick={() => openMealPopup(meal)}>View</button>
                </div>
              </div>
            ))}
          </div>
          <span>And that's just for starters!</span>
        </div>
        <Link to="/menu">
          <button className="browseMenuButton">View Our Full Menu Here!</button>
        </Link>
        <div className="customer-review">
          <img src={foodDish} alt="Food" className="left-image" />
          <div className="review-card">
            <div className="review-text">
              <h4>WHAT THEY SAY</h4>
              <h2>What Our Customers Say About Us</h2>
              <p>"Chef's Choice is the best. Besides the many and delicious meals, the service is also very good, especially in the very fast delivery. I highly recommend Chef's Choice to you."</p>
            </div>
            <div className="review-profile">
              <div className="proPic-Container">
                <img src={proPic} alt="Willow" />
              </div>
              <div className="pro-titles">
                <h5>Willow Clark</h5>
                <p>Food Enthusiast</p>
                <span>⭐⭐⭐⭐⭐ 5.0</span>
              </div>
            </div>
            <Link to="/login">
              <button className="get-started-button">Get Started</button>
            </Link>
          </div>
        </div>
      </div>

      {selectedMeal && (
        <div className="main-container">
          <div className="pop-up-container">
            <span className="close-btn" onClick={closeMealPopup}>
              X
            </span>
            <div className="img-container">
              <img src={`/assets/${selectedMeal.image}`} alt={selectedMeal.name} />
            </div>
            <div className="info-container">
              <h2 className="item-name">{selectedMeal.name}</h2>
              <p className="item-description">{selectedMeal.description}</p>
              <p className="item-price">Price: ${selectedMeal.price}</p>
              <div className="nutrition-container">
                <span className="nutrition-title">Nutrition per serving</span>
                <div className="nutrition-values">
                  <span className="nutrition-value">Calories: {selectedMeal.calories}</span>
                  <span className="nutrition-value">Protein: {selectedMeal.protein}g</span>
                  <span className="nutrition-value">Fats: {selectedMeal.fats}g</span>
                  <span className="nutrition-value">Carbs: {selectedMeal.carbs}g</span>
                </div>
              </div>
              <div className="instructions-container">
                <h3 className="instructions-title">Instructions</h3>
                <div className="instruction-item">
                  <span className="instruction-type">For oven</span>
                  <span className="instruction-detail">
                    Preheat to 375°F. Place ventilated meal on a sheet pan. Bake 15 to 18 minutes, or until heated through. (Do not use a toaster oven.)
                  </span>
                </div>
                <div className="instruction-item">
                  <span className="instruction-type">For Microwave</span>
                  <span className="instruction-detail">
                    Heat on high 2 to 3 minutes, or until heated through.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
