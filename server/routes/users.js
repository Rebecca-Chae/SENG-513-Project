const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const io = require("../server").io;
const User = require("../models/user.model");

// TODO: refine these error status codes

// GET REQUESTS

// get all users in the db
router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

// get user with specified username
router.route("/user/:username").get((req, res) => {
    User.findOne({username: req.params.username})
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
});

// POST REQUESTS

// create new user, save to db, return newly added user
router.route("/sign-up").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({
        username: username, password: password
    });

    // hash password with a salt
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            // set newUser password to the hashed password
            newUser.password = hash;

            // generate a token that expires in 300 seconds (5 min)
            const token = jwt.sign({ username: username }, "somesecret");

            // save the user to the db
            newUser.save()
                .then(() => res.status(200).json({ userInfo: newUser, "token": token }))
                .catch(err => res.status(400).json("Error: " + err));
        });
    });
});

module.exports = router;