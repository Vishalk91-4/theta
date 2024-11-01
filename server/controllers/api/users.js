const userService = require("../../services/users");
const User = require("../../models/user");

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const userDetails = await userService.createUser(userData);
        res.status(201).json(userDetails);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUserByID(req.user.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUserByID(req.user.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginByEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDetails = await userService.loginByEmail(email, password);
        res.json({ userDetails });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// This method is to test authentication middleware
const authTestFunction = async (req, res) => {
    try {
        const user = req.user;
        res.json(user)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createUser, getUser, updateUser, deleteUser, loginByEmail, authTestFunction };
