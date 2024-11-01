import React, { useEffect, useState } from 'react';
import './BrowseMeals.css'

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
        category: categories[0], // vegetarian
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
        category: categories[1], // low carb
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
        category: categories[1], // make low carb
        price: 10.99,
        description: "Tender beef stir-fried with fresh broccoli in a savory sauce.",
        calories: 400,
        protein: 30,
        carbs: 15,
        fats: 25
    },
    {
        name: "Vegetable Stir-Fry with Tofu",
        image: "vegetable-stir-fry-w-tofu@2x.png",
        category: categories[0], // make Vegetarian
        price: 10.99,
        description: "A colorful stir-fry of mixed vegetables and tofu.",
        calories: 350,
        protein: 15,
        carbs: 45,
        fats: 10
    },
    {
        name: "Spaghetti Bolognese",
        image: "spaghetti-bolognese@2x.png",
        category: categories[2], // make gluten free
        price: 10.99,
        description: "Classic spaghetti Bolognese with a rich meat sauce.",
        calories: 550,
        protein: 20,
        carbs: 60,
        fats: 25
    },
    {
        name: "Caesar Salad",
        image: "grilled-chicken-salad@2x.png",
        category: categories[1], // make low carb
        price: 10.99,
        description: "Crisp romaine lettuce with Caesar dressing and grilled chicken.",
        calories: 400,
        protein: 25,
        carbs: 10,
        fats: 30
    },
    {
        name: "Vegetable Curry",
        image: "vegetable-curry.png",
        category: categories[0], // make Vegetarian
        price: 10.99,
        description: "A flavorful curry with mixed vegetables and coconut milk.",
        calories: 450,
        protein: 12,
        carbs: 60,
        fats: 20
    },
    {
        name: "BBQ Pulled Pork",
        image: "bbq-pulled-pork@2x.png",
        category: categories[1], // make low carb
        price: 10.99,
        description: "Slow-cooked pulled pork with BBQ sauce and coleslaw.",
        calories: 500,
        protein: 35,
        carbs: 20,
        fats: 25
    },
    {
        name: "Chicken Fajitas",
        image: "chicken-fajitas.png",
        category: categories[2], // make gluten free
        price: 10.99,
        description: "Grilled chicken with bell peppers and onions, served with gluten-free tortillas.",
        calories: 450,
        protein: 30,
        carbs: 40,
        fats: 15
    },
    {
        name: "Stuffed Bell Peppers",
        image: "stuffed-bell-pepper.png",
        category: categories[0], // make Vegetarian
        price: 10.99,
        description: "Bell peppers stuffed with quinoa, black beans, and corn.",
        calories: 300,
        protein: 10,
        carbs: 40,
        fats: 10
    },
    {
        name: "Tuna Salad",
        image: "tuna-salad.png",
        category: categories[1], // make low carb
        price: 10.99,
        description: "Fresh tuna salad on a bed of mixed greens.",
        calories: 350,
        protein: 25,
        carbs: 5,
        fats: 20
    },
    {
        name: "Beef Stroganoff",
        image: "beef-stroganoff.png",
        category: categories[2], // make gluten free
        price: 10.99,
        description: "Classic beef stroganoff with gluten-free pasta.",
        calories: 600,
        protein: 30,
        carbs: 40,
        fats: 35
    },
    {
        name: "Vegetarian Chili",
        image: "vegetable-curry.png",
        category: categories[0], // make Vegetarian
        price: 10.99,
        description: "Hearty vegetarian chili with beans, tomatoes, and peppers.",
        calories: 400,
        protein: 15,
        carbs: 60,
        fats: 10
    },
    {
        name: "Salmon with Asparagus",
        image: "salmon-w-asparagus.png",
        category: categories[1], // make low carb
        price: 10.99,
        description: "Grilled salmon served with asparagus.",
        calories: 500,
        protein: 35,
        carbs: 10,
        fats: 30
    },
    {
        name: "Chicken Alfredo",
        image: "chicken-alfredo@2x.png",
        category: categories[2], // make gluten free
        price: 10.99,
        description: "Creamy chicken Alfredo with gluten-free pasta.",
        calories: 700,
        protein: 25,
        carbs: 60,
        fats: 45
    },
    {
        name: "Eggplant Parmesan",
        image: "eggplant-parmesan@2x.png",
        category: categories[0], // make Vegetarian
        price: 10.99,
        description: "Baked eggplant with marinara sauce and melted cheese.",
        calories: 400,
        protein: 15,
        carbs: 45,
        fats: 20
    },
    {
        name: "Turkey Meatballs",
        image: "turkey-meatballs@2x.png",
        category: categories[1], // make low carb
        price: 10.99,
        description: "Savory turkey meatballs in a rich tomato sauce.",
        calories: 350,
        protein: 30,
        carbs: 10,
        fats: 15
    },
    {
        name: "Shrimp Scampi",
        image: "shrimp-scampi.png",
        category: categories[2], // make gluten free
        price: 10.99,
        description: "Succulent shrimp in a garlic butter sauce with gluten-free pasta.",
        calories: 450,
        protein: 30,
        carbs: 35,
        fats: 20
    },
    {
        name: "Vegetable Lasagna",
        image: "vegetable-lasagna@2x.png",
        category: categories[0], // make Vegetarian
        price: 10.99,
        description: "Layers of vegetables, cheese, and gluten-free pasta.",
        calories: 500,
        protein: 20,
        carbs: 60,
        fats: 25
    },
    {
        name: "Chicken Caesar Wrap",
        image: "chicken-caesar-wrap.png",
        category: categories[1], // make low carb
        price: 10.99,
        description: "Grilled chicken with Caesar dressing in a gluten-free wrap.",
        calories: 400,
        protein: 25,
        carbs: 30,
        fats: 20
    },
    {
        name: "Greek Yogurt Parfait with Berries and Granola",
        image: "granola-yogurt.png",
        category: categories[2], // make gluten free
        price: 10.99,
        description: "Layers of Greek yogurt, fresh berries, and a crunchy gluten-free granola.",
        calories: 300,
        protein: 20,
        carbs: 40,
        fats: 10
    },
{
        name: "Tuna Steak",
        image: "tuna-steak@2x.png",
        category: categories[3], // high protein
        price: 10.99,
        description: "Seared tuna steak served with a side of quinoa salad.",
        calories: 450,
        protein: 40,
        carbs: 20,
        fats: 15
    },
{
        name: "Pork Loins",
        image: "breaded-pork-chops.png",
        category: categories[3], // high protein
        price: 10.99,
        description: "Tender pork loins grilled to perfection, served with a side of sautéed spinach.",
        calories: 500,
        protein: 40,
        carbs: 15,
        fats: 25
    },
{
        name: "Turkey Breast",
        image: "turkey-breast.png",
        category: categories[3], // high protein
        price: 10.99,
        description: "Roasted turkey breast served with a side of green beans.",
        calories: 400,
        protein: 35,
        carbs: 10,
        fats: 15
    },
{
        name: "Three Meat Meatloaf",
        image: "homestyle-meatloaf.png",
        category: categories[3], // high protein
        price: 10.99,
        description: "A hearty meatloaf made with a blend of beef, pork, and veal, served with mashed potatoes.",
        calories: 550,
        protein: 40,
        carbs: 25,
        fats: 30
    },
{
        name: "Chicken Cordon Bleu",
        image: "chicken-fajitas.png",
        category: categories[3], // high protein
        price: 10.99,
        description: "Breaded chicken breast stuffed with ham and cheese, served with a side of steamed broccoli.",
        calories: 500,
        protein: 35,
        carbs: 20,
        fats: 25
    },
{
        name: "Steak",
        image: "steak.png",
        category: categories[3], // high protein
        price: 10.99,
        description: "A juicy, grilled steak cooked to perfection, served with roasted vegetables.",
        calories: 600,
        protein: 45,
        carbs: 10,
        fats: 35
    },
    {
        name: "Chicken Alfredo (Gluten-Free)",
        image: "chicken-alfredo@2x.png",
        category: [categories[4], categories[2]], // family size / Gluten Free
        price: 10.99,
        description: "Family-sized creamy chicken Alfredo served with gluten-free pasta.",
        calories: 1400,
        protein: 50,
        carbs: 120,
        fats: 90
    },
    {
        name: "Salmon with Asparagus (Gluten-Free)",
        image: "salmon-w-asparagus.png",
        category: [categories[4], categories[2]], // family size / Gluten Free
        price: 10.99,
        description: "Family-sized oven-baked salmon fillets served with asparagus and quinoa.",
        calories: 1000,
        protein: 70,
        carbs: 60,
        fats: 40
    },
    {
        name: "Shrimp Scampi (Gluten-Free)",
        image: "shrimp-scampi.png",
        category: [categories[4], categories[2]], // family size / Gluten Free
        price: 10.99,
        description: "Family-sized shrimp scampi served with gluten-free pasta and a garlic butter sauce.",
        calories: 900,
        protein: 60,
        carbs: 70,
        fats: 50
    },
    {
        name: "Beef Stroganoff (Gluten-Free)",
        image: "beef-stroganoff.png",
        category: [categories[4], categories[2]], // family size / Gluten Free
        price: 10.99,
        description: "Family-sized beef stroganoff made with gluten-free pasta and a creamy sauce.",
        calories: 1200,
        protein: 60,
        carbs: 80,
        fats: 70
    },
    {
        name: "Chicken Fajitas (Gluten-Free)",
        image: "chicken-fajitas.png",
        category: [categories[4], categories[2]], // family size / Gluten Free
        price: 10.99,
        description: "Family-sized grilled chicken fajitas with bell peppers and onions, served with gluten-free tortillas.",
        calories: 900,
        protein: 60,
        carbs: 80,
        fats: 30
    },
    {
        name: "Spaghetti Bolognese (Gluten-Free)",
        image: "spaghetti-bolognese.png",
        category: [categories[4], categories[2]], // family size / Gluten Free
        price: 10.99,
        description: "Family-sized classic spaghetti Bolognese made with gluten-free pasta and a rich meat sauce.",
        calories: 1100,
        protein: 40,
        carbs: 120,
        fats: 50
    },
    {
        name: "Steak",
        image: "steak.png",
        category: [categories[4], categories[3]], // family size & high protein
        price: 10.99,
        description: "A family-sized portion of juicy, grilled steak cooked to perfection, served with roasted vegetables.",
        calories: 1200,
        protein: 90,
        carbs: 20,
        fats: 70
    },
    {
        name: "Chicken Cordon Bleu",
        image: "chicken-fajitas.png",
        category: [categories[4], categories[3]], // family size & high protein
        price: 10.99,
        description: "Family-sized breaded chicken breasts stuffed with ham and cheese, served with a side of steamed broccoli.",
        calories: 1000,
        protein: 70,
        carbs: 40,
        fats: 50
    },
    {
        name: "Three Meat Meatloaf",
        image: "homestyle-meatloaf.png",
        category: [categories[4], categories[3]], // family size & high protein
        price: 10.99,
        description: "A hearty family-sized meatloaf made with a blend of beef, pork, and veal, served with mashed potatoes.",
        calories: 1100,
        protein: 80,
        carbs: 50,
        fats: 60
    },
    {
        name: "Turkey Breast",
        image: "turkey-breast.png",
        category: [categories[4], categories[3]], // family size & high protein
        price: 10.99,
        description: "Family-sized roasted turkey breast served with a side of green beans.",
        calories: 800,
        protein: 70,
        carbs: 20,
        fats: 30
    },
    {
        name: "Pork Loins",
        image: "breaded-pork-chops.png",
        category: [categories[4], categories[3]], // family size & high protein
        price: 10.99,
        description: "Tender family-sized pork loins grilled to perfection, served with a side of sautéed spinach.",
        calories: 1000,
        protein: 80,
        carbs: 30,
        fats: 50
    },
    {
        name: "Tuna Steak",
        image: "tuna-steak@2x.png",
        category: [categories[4], categories[3]], // family size & high protein
        price: 10.99,
        description: "Family-sized seared tuna steaks served with a side of quinoa salad.",
        calories: 900,
        protein: 80,
        carbs: 40,
        fats: 30
    },
    {
        name: "Grilled Chicken Breast",
        image: "grilled-chicken.png",
        category: [categories[4], categories[3]], // family size & high protein
        price: 10.99,
        description: "Family-sized juicy grilled chicken breast served with steamed vegetables.",
        calories: 800,
        protein: 70,
        carbs: 10,
        fats: 20
    },
    {
        name: "Duck à l'Orange",
        image: "duck-a-la-orange.png",
        category: categories[5], // top shelf
        price: 10.99,
        description: "A French classic of roasted duck with an orange glaze, served with dauphinoise potatoes and green beans almondine.",
        calories: 800,
        protein: 40,
        carbs: 50,
        fats: 50
    },
    {
        name: "Sea Bass",
        image: "sea-bass.png",
        category: categories[5], // top shelf
        price: 10.99,
        description: "Pan-seared sea bass served with a lemon caper sauce, garlic mashed potatoes, and steamed broccolini.",
        calories: 650,
        protein: 35,
        carbs: 40,
        fats: 35
    },
    {
        name: "Truffle Risotto",
        image: "rice-and-beans.png",
        category: categories[5], // top shelf
        price: 10.99,
        description: "Creamy risotto infused with black truffles and Parmesan cheese, served with a side of mixed greens.",
        calories: 600,
        protein: 20,
        carbs: 70,
        fats: 25
    },
    {
        name: "Rack of Lamb",
        image: "rack-of-lamb.png",
        category: categories[5], // top shelf
        price: 10.99,
        description: "Herb-crusted rack of lamb, roasted to perfection and served with rosemary roasted potatoes and glazed carrots.",
        calories: 750,
        protein: 40,
        carbs: 35,
        fats: 45
    },
    {
        name: "Lobster Thermidor",
        image: "lobster-thermidor.png",
        category: categories[5], // top shelf
        price: 10.99,
        description: "Classic French dish with lobster meat cooked in a rich creamy wine sauce, served with a side of wild rice.",
        calories: 800,
        protein: 45,
        carbs: 40,
        fats: 50
    },
    {
        name: "Filet Mignon",
        image: "steak.png",
        category: categories[5], // top shelf
        price: 10.99,
        description: "A luxurious cut of filet mignon, grilled to perfection and served with truffle mashed potatoes and asparagus.",
        calories: 700,
        protein: 50,
        carbs: 30,
        fats: 40
    },
    {
        name: "Stuffed Mushrooms",
        image: "stuffed-mushroom.png",
        category: categories[6], // ala carte
        price: 10.99,
        description: "Mushrooms stuffed with a blend of cheeses and herbs, baked until golden brown.",
        calories: 220,
        protein: 8,
        carbs: 15,
        fats: 15
    },
    {
        name: "Caesar Salad",
        image: "chicken-caesar-salad.png",
        category: categories[6], // ala carte
        price: 10.99,
        description: "Crisp romaine lettuce with Caesar dressing, Parmesan cheese, and croutons.",
        calories: 200,
        protein: 7,
        carbs: 15,
        fats: 12
    },
    {
        name: "Garlic Bread",
        image: "garlic-bread.png",
        category: categories[6], // ala carte
        price: 10.99,
        description: "Crispy garlic bread with a buttery garlic spread.",
        calories: 250,
        protein: 5,
        carbs: 30,
        fats: 12
    },
    {
        name: "Fruit and Cheese Platter",
        image: "fruit-and-cheese-platter@2x.png",
        category: categories[6], // ala carte
        price: 10.99,
        description: "A selection of fresh fruits and gourmet cheeses.",
        calories: 300,
        protein: 10,
        carbs: 25,
        fats: 20
    },
    {
        name: "Garden Salad",
        image: "garden-salad.png",
        category: categories[6], // ala carte
        price: 10.99,
        description: "A fresh mix of greens, tomatoes, cucumbers, and carrots with your choice of dressing.",
        calories: 120,
        protein: 3,
        carbs: 15,
        fats: 6
    },
    {
        name: "Steamed Broccoli",
        image: "steamed-broccoli@2x.png",
        category: categories[6], // ala carte
        price: 10.99,
        description: "Fresh broccoli florets steamed to perfection.",
        calories: 100,
        protein: 4,
        carbs: 15,
        fats: 2
    },
    {
        name: "Roasted Vegetables",
        image: "roasted-vegetables.png",
        category: categories[6], // ala carte
        price: 10.99,
        description: "A mix of seasonal vegetables roasted with olive oil and herbs.",
        calories: 150,
        protein: 4,
        carbs: 20,
        fats: 8
    },
    {
        name: "Mac and Cheese",
        image: "mac-and-cheese.png",
        category: categories[6], // ala carte
        price: 10.99,
        description: "Classic mac and cheese with a rich and creamy cheese sauce.",
        calories: 450,
        protein: 15,
        carbs: 50,
        fats: 20
    },
    {
        name: "Mashed Potatoes",
        image: "rice.png",
        category: categories[6], // ala carte
        price: 10.99,
        description: "Creamy mashed potatoes made with butter and a touch of garlic.",
        calories: 200,
        protein: 4,
        carbs: 35,
        fats: 6
    },
    {
        name: "Pasta Primavera",
        image: "pasta-primavera.png",
        category: categories[6], // ala carte
        price: 10.99,
        description: "Fresh pasta tossed with seasonal vegetables in a light garlic sauce.",
        calories: 350,
        protein: 12,
        carbs: 55,
        fats: 10
    }
]

const BrowseMeals: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const [selectedMeal, setSelectedMeal] = useState<any | null>(null);
    const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(6);
    let increment = 6;


    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + increment);
        increment = increment + 6;
    };

    const filteredMeals = filteredCategory
    ? mealsData.filter(meal => Array.isArray(meal.category) ? meal.category.includes(filteredCategory) : meal.category === filteredCategory)
    : mealsData;

    const openMealPopup = (meal: any) => {
        setSelectedMeal(meal);
        // Code to open popup or modal goes here
    };

    const closeMealPopup = () => {
        setSelectedMeal(null);
    };


    return (
        <div className='BrowseMeals'>
            <h2 className='browse-h2'>Weekly Menu</h2>
            <div className='filters'>
                <span>Filter by Category:</span>
                <select onChange={(e) => setFilteredCategory(e.target.value)}>
                    <option value="">All</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className='meal-cards-grid'>
                {filteredMeals.slice(0, visibleCount).map((meal, index) => (
                    <div className='meal-card browse'>
		                <div className="meal-image" style={{ backgroundImage: `url(/assets/${meal.image})` }}></div>
                        <h3 className="meal-card-name">{meal.name}</h3>
                        <p className="meal-card-sides">Lorem ipsum dolor sit amet</p>
                        <div className="meal-card-rating">
                            <span className="meal-card-star">★★★★★</span>
                            <span className="meal-card-rating-count">10</span>
                        </div>
                        <p className="meal-card-price">${meal.price.toFixed(2)}</p>
                        <div className='browse-view-button-container'>
                            <button className='meal-card-view-button' onClick={() => openMealPopup(meal)}>View</button>
                        </div>
                    </div>
                ))}
            </div>
            {visibleCount < filteredMeals.length && (
                <button onClick={loadMore} className='browse-load-more-button'>Load More</button>
            )}

        {/* Pop Up */}
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
                            <div className="rating">
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="rating-count">{selectedMeal.rating}</span>
                            </div>
                            <div className="calorie-smart">Calorie Smart</div>
                            <div className="options-container">
                                <select className="option-select">
                                    <option>Lorem ipsum dolor sit amet</option>
                                    <option>Excepteur sint occaecat</option>
                                    <option>Sed ut perspiciatis unde</option>
                                    <option>Nemo enim ipsam voluptatem</option>
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
                                        Calories: {selectedMeal.calories}
                                    </span>
                                    <span className="nutrition-value">
                                        Protein: {selectedMeal.protein}g
                                    </span>
                                    <span className="nutrition-value">
                                        Fats: {selectedMeal.fats}g
                                    </span>
                                    <span className="nutrition-value">
                                        Carbs: {selectedMeal.carbs}g
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BrowseMeals;
