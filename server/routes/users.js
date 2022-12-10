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

// TODO: define POST endpoint for user authentication (exists user in db with given username & password)


// POST REQUESTS

// create new user, save to db, return newly added user
router.route("/sign-up").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({
        username: username, password: password
    });

    // save the user to the db
    newUser.save()
        // see if .then(result => res.status(200).json(result))
        .then(() => res.status(200).json({ userInfo: newUser }))
        .catch(err => res.status(400).json("Error: " + err));
});

// user authentication for login (does there exist a user in db with given user/pass combo?)
router.route("/login").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username, password: password })
        .then(user => {
            if (user === null) res.status(401).json(user)
            else res.status(200).json(user)
        })
        .catch(err => res.status(500).json("Error: " + err));
});

module.exports = router;