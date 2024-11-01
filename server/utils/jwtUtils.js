const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
    };
    return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

module.exports = { generateToken };
