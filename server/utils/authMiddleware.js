const jwt = require("jsonwebtoken");
const secretKey = require("../configuration/jwtConfig");

const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing token!" });
    }
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }
    jwt.verify(token, secretKey['secretKey'], { algorithms: ['HS256'] }, (err, user) => {
        if (err) {
            return res.json({ message: "Forbidden: invalid token" });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
