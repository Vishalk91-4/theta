const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtils");
const { createCollection } = require("../models/order");

// Create new user
const createUser = async (userData) => {
    const { name, email, password, homeAddress, dailyCalories, age } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        homeAddress,
        dailyCalories,
        age,
    });
    const savedUser = await createdUser.save();
    const token = generateToken(savedUser);
    const userDetails = {
        token: token,
        user: savedUser
    }
    return userDetails;
};

// Get a user by ID
const getUserByID = async (userId) => {
    return await User.findById(userId)
        .populate('goals')
        .populate('preferences')
        .populate('sensitivities')
        .populate('deliveriesPerWeek')
        .populate('servings')
        .populate('phoneNumber')
};

// Update a user by ID
const updateUserByID = async (userId, updateData) => {
    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

// Delete a user by ID
const deleteUserByID = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

// Login using email and password
const loginByEmail = async (email, password) => {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Password Invalid");
        }
        const token = generateToken(existingUser)
        const userDetails = {
            token: token,
            user: existingUser
        }
        return userDetails;
    } catch (error) {
        if (error.message === "User not found" || error.message === "Password Invalid") {
            throw new Error(error.message)
        }
    }
};

module.exports = { createUser, getUserByID, updateUserByID, deleteUserByID, loginByEmail };
