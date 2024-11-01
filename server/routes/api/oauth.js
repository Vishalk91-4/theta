const express = require("express");
const router = express.Router();
const passport = require("../../configuration/passport");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/redirect",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.cookie("jwt", req.user.token, { httpOnly: true, expire: 24 * 60 * 60 * 1000 });
        // Redirect route can be changed to whatever. Cookie will be accessed in React
        res.redirect("http://localhost:3000")
    }
);

module.exports = router;
