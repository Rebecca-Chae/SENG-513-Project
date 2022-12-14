const router = require("express").Router();
const io = require("../server").io;
const User = require("../models/user.model");

// GET REQUESTS

// get all users in the db
router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json("Error: " + err));
});

// get user with specified username
router.route("/user/:username").get((req, res) => {
    User.findOne({username: req.params.username})
        .then(user => {
            if (user === null) res.status(400).json(user)
            else res.status(200).json(user)
        })
        .catch(err => res.status(500).json("Error: " + err));
});

// POST REQUESTS

// create new user, save to db, return newly added user
router.route("/sign-up").post(async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        // note: confirmPass not added to schema because it is not written to the db
        const confirmPass = req.body.confirmPass;

        if (password !== confirmPass) {
            res.status(400).json("Error: passwords don't match");
        } else {
            const newUser = new User({
                username: username, password: password
            });

            // save the user to the db
            await newUser.save();
            res.status(200).json({ userInfo: newUser });
        }
    } catch (err) {
        if (err.name === "ValidationError") {
            // case that request is missing required username or password
            res.status(400).json("Error: " + err);
        } else {
            res.status(500).json("Error: " + err);
        }
    }
});

// user authentication for login (does there exist a user in db with given user/pass combo?)
router.route("/login").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username, password: password })
        .then(user => {
            if (user === null) res.status(404).json(user)
            else res.status(200).json(user)
        })
        .catch(err => res.status(500).json("Error: " + err));
});

module.exports = router;
