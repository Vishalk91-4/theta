// if on testing images do not populate alter relative path to ../client etc

require('dotenv').config();
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('Mongo is showing us love')
})

const Category = require('../models/category');
const Item = require('../models/item');
const User = require('../models/user')
const Order = require('../models/order')

const seed = async () => {
    await Category.deleteMany({});
    const categories = await Category.create([
        // Goals
        { name: 'Weight management', sortOrder: 1, description: 'Goal: Weight management' },
        { name: 'Improve overall health', sortOrder: 2, description: 'Goal: Improve overall health' },
        { name: 'Explore cuisines', sortOrder: 3, description: 'Goal: Explore cuisines' },
        { name: 'Save time', sortOrder: 4, description: 'Goal: Save time' },
        { name: 'Reduce food waste', sortOrder: 5, description: 'Goal: Reduce food waste' },
        { name: 'None of these apply', sortOrder: 6, description: 'Goal: None of these apply' },

        // Preferences
        { name: 'Vegetarian', sortOrder: 7, description: 'Preference: Vegetarian', copy: 'No meat, poultry, and fish.' },
        { name: 'Pescatarian', sortOrder: 8, description: 'Preference: Pescatarian', copy: 'Seafood as your source of protein.' },
        { name: 'Keto', sortOrder: 9, description: 'Preference: Keto', copy: 'Low-carb for energy boost.'},
        { name: 'Paleo', sortOrder: 10, description: 'Preference: Paleo', copy: 'Lean meats, veggies, & fruits' },
        { name: 'Flexitarian', sortOrder: 11, description: 'Preference: Flexitarian', copy: 'Plant-based with occasional meat' },
        { name: 'Chef\'s choice', sortOrder: 12, description: 'Preference: Chef\'s choice', copy: 'Surprise yourself!' },
        { name: 'High-protein', sortOrder: 13, description: 'Preference: High-protein', copy: 'Build muscle and manage weight' },
        { name: 'Calorie smart', sortOrder: 14, description: 'Preference: Calorie smart', copy: 'Build muscle and manage weight' },

        // Sensitivities
        { name: 'Nuts', sortOrder: 15, description: 'Sensitivity: Nuts', icon: 'nuts.png'},
        { name: 'Gluten', sortOrder: 16, description: 'Sensitivity: Gluten', icon: 'gluten.png' },
        { name: 'Soy', sortOrder: 17, description: 'Sensitivity: Soy', icon: 'soy.png' },
        { name: 'Dairy', sortOrder: 18, description: 'Sensitivity: Dairy', icon: 'dairy.png' },
        { name: 'Eggs', sortOrder: 19, description: 'Sensitivity: Eggs', icon: 'eggs.png' },
        { name: 'Shell fish', sortOrder: 20, description: 'Sensitivity: Shell fish', icon: 'shellfish.png' },
        { name: 'Fish', sortOrder: 21, description: 'Sensitivity: Fish', icon: 'fish.png' },
        { name: 'None', sortOrder: 22, description: 'Sensitivity: None' }
    ])

    await Item.deleteMany({});
    const items = await Item.create([
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
            name: "Family Size Chicken Alfredo (Gluten-Free)",
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
            name: "Family Size Salmon with Asparagus (Gluten-Free)",
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
            name: "Family Size Shrimp Scampi (Gluten-Free)",
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
            name: "Family Size Beef Stroganoff (Gluten-Free)",
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
            name: "Family Size Chicken Fajitas (Gluten-Free)",
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
            name: "Family Size Spaghetti Bolognese (Gluten-Free)",
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
            name: "Family Size Steak",
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
            name: "Family Size Chicken Cordon Bleu",
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
            name: "Family Size Three Meat Meatloaf",
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
            name: "Family Size Turkey Breast",
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
            name: "Family Size Pork Loins",
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
            name: "Family Size Tuna Steak",
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
            name: "Family Size Grilled Chicken Breast",
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
            name: "Jasmine Rice",
            image: "rice.png",
            category: categories[6], // ala carte
            price: 10.99,
            description: "Steamed Jasmine Rice with butter and a touch of garlic.",
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


    ])


    await User.deleteMany({})
    const hashedPassword = await bcrypt.hash(process.env.SEED_PASSWORD, 10);
    const users = await User.create([
        {
            name: "Christopher Admin",
            email: "clazariuk@gmail.com",
            password: hashedPassword,
            homeAddress: "123 Main St, Anytown, USA",
            dailyCalories: 2500,
            age: 33,
            sensitivities: [categories[15]]
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            password: hashedPassword,
            homeAddress: "456 Oak St, Anytown, USA",
            dailyCalories: 2000,
            age: 28,
            sensitivities: [categories[17], categories[18]]
        },
        {
            name: "Emily Johnson",
            email: "emily.johnson@example.com",
            password: hashedPassword,
            homeAddress: "789 Pine St, Anytown, USA",
            dailyCalories: 1800,
            age: 35,
            dietary_Categories: [categories[16]]
        },
        {
            name: "Michael Brown",
            email: "michael.brown@example.com",
            password: hashedPassword,
            homeAddress: "101 Maple St, Anytown, USA",
            dailyCalories: 2200,
            age: 40,
            sensitivities: [categories[15]]
        },
        {
            name: "Sarah Davis",
            email: "sarah.davis@example.com",
            password: hashedPassword,
            homeAddress: "202 Elm St, Anytown, USA",
            dailyCalories: 2100,
            age: 32,
            sensitivities: [categories[20]]
        },
        {
            name: "David Wilson",
            email: "david.wilson@example.com",
            password: hashedPassword,
            homeAddress: "303 Birch St, Anytown, USA",
            dailyCalories: 2600,
            age: 27,
            sensitivities: [categories[17]]
        },
        {
            name: "Laura Martinez",
            email: "laura.martinez@example.com",
            password: hashedPassword,
            homeAddress: "404 Cedar St, Anytown, USA",
            dailyCalories: 1900,
            age: 29,
            sensitivities: [categories[18], categories[19]]
        },
        {
            name: "James Anderson",
            email: "james.anderson@example.com",
            password: hashedPassword,
            homeAddress: "505 Spruce St, Anytown, USA",
            dailyCalories: 2400,
            age: 31,
            sensitivities: [categories[20], categories[21]]
        },
        {
            name: "Patricia Thomas",
            email: "patricia.thomas@example.com",
            password: hashedPassword,
            homeAddress: "606 Aspen St, Anytown, USA",
            dailyCalories: 2300,
            age: 34,
            sensitivities: [categories[15]]
        },
        {
            name: "Robert Jackson",
            email: "robert.jackson@example.com",
            password: hashedPassword,
            homeAddress: "707 Redwood St, Anytown, USA",
            dailyCalories: 2700,
            age: 33,
            sensitivities: [categories[19]]
        }
    ])
    console.log(users) // comment out as needed to correctly examine the seeding process

    await Order.deleteMany({})
    const orders = await Order.create([
        {
            user: users[0].id,
            lineItems: [
                { item: items[0], qty: 1 },
                { item: items[1], qty: 1 },
                { item: items[2], qty: 1 },
            ],
            total: items[0].price * 2 + items[1].price,
        },
        {
            user: users[1].id,
            lineItems: [
                { item: items[2], qty: 1 },
                { item: items[3], qty: 1 },
                { item: items[4], qty: 1 },
            ],
            total: items[2].price * 1 + items[3].price * 3,
        },
    ]);

    process.exit()
}


seed()
