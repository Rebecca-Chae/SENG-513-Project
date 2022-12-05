const router = require("express").Router();

const io = require("../server").io;
const User = require("../models/user.model");
const List = require("../models/list.model");

// TODO: refine these error status codes

/*
    POST REQUESTS 
*/

//Create a new list given a user ID it belongs to
router.route("/new-list").post((req, res) => {
    User.findOne({ _id: req.body.userID})
        .then(user => {
            if(user === null){
                res.status(400).json("Error : No user with ID ${req.body.userID} exists");
            }else {
                const newList = new List({
                    listName: req.body.listName, budget: req.body.budget, creatorID: req.body.userID
                });
                newList.save()
                    .then(() => res.status(200).json)
                    .catch(err => res.status(500).json("Error: " + err));
            }
        })
        .catch(err => res.status(500).json("Error: " + err));
});

//Change list name
router.route("/:listID").post((req, res) => {
    List.updateOne({ _id: req.params.listID}, { $set: {listName: req.body.item}})
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

//Change budget of list
router.route("/change-budget/:listID").post((req, res) => {
    List.updateOne({ _id: req.params.itemID}, { $set: {budget: req.body.budget}})
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

//Change or add user with permission 
router.route("/add-user/:listID").post((req, res) => {
    //add user
    List.updateOne(
        { _id: req.params.listID}, 
        {$set: 
            {shared: 
                {user: req.body.user, 
                permission: req.body.user.permission
                }
            }
        }
    )
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
    //make list for this user

    
});

/*
    GET REQUESTS
*/


//Get all the lists of the user
router.route("/user/:username").get((req, res) => {
    User.findOne({ _id: req.body.userID})
    .then( user => {
        List.find()
        .then(lists => res.json(lists))
        .catch(err => res.status(400).json("Error: " + err));
    })
});

//Get a specific list of the user
router.route("/user/:username").get((req, res) => {
    User.findOne({ _id: req.body.userID})
    .then( user => {
        List.findOne({ _id: req.body.listID})
        .then( list => {
            if (list === null) res.status(400).json(list)
            else res.status(200).json(list)
        })
        .catch(err => res.status(400).json("Error: " + err));
    })
});

//Get budget of list
router.route("/user/:username").get((req, res) => {
    User.findOne({username: req.params.username})
        .then(user => {
            if (user === null) res.status(400).json(user)
            else res.status(200).json(user)
        })
        .catch(err => res.status(500).json("Error: " + err));
});

//Get total value of list

//Get all users and their permission levels

//Get all items in the list

/*
    DELETE REQUESTS
*/

//Delete list
router.route("/:listID").delete((req, res) => {
    List.remove({ _id: req.params.listID})
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

//Delete a user
router.route("/:listID").delete((req, res) => {
    List.remove({ _id: req.params.listID})
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

module.exports = router;
