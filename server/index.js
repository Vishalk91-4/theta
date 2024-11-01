const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('./configuration/passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.GOOGLE_CLIENT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// TODO: Get MONGO_URI for env file
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
 .then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err));

// Routes will go here

const userRoute = require("./routes/api/users");
app.use("/user", userRoute);

const itemsRoute = require('./routes/api/items');
app.use("/items", itemsRoute);
const categoryRoute = require('./routes/api/categories');
app.use("/category", categoryRoute);


const authRoute = require("./routes/api/oauth");
app.use("/auth", authRoute);

const checkoutRoute = require("./routes/api/checkout");
app.use("/checkout", checkoutRoute)

const orderRoute = require('./routes/api/orders');
app.use("/orders", orderRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Simple index route to test changes
app.get("/", (req, res) => {
    res.send("Hi.........")
})
