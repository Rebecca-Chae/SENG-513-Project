const router = require("express").Router();

const io = require("../server").io;
const User = require("../models/user.model");
const List = require("../models/list.model");

/*
    POST REQUESTS 
*/

//Create a new list given a user ID it belongs to
router.route("/new-list").post((req, res) => {
    User.findOne({ username: req.body.username})
        .then(user => {
            if(user === null){
                res.status(400).json("Error : No user with ID ${req.body.userID} exists");
            }else {
                const newList = new List({
                    listName: req.body.listName, 
                    budget: req.body.budget, 
                    creatorID:username
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
    List.updateOne({ _id: req.params.listID}, { $set: {listName: req.body.listName}})
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

//Change budget of list
router.route("/update-budget/:listID").post((req, res) => {
    List.updateOne({ _id: req.params.listID}, { $set: {budget: req.body.budget}})
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

//Change or add user with permission 
router.route("/add-user/:listID").post((req, res) => {
    //add user
    List.updateOne(
        { _id: req.params.listID}, 
        {$set: 
            {shared: {user: req.body.user, permission: req.body.permission} }
        }
    )
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

/*
    GET REQUESTS
*/

//Get all the lists of the user
router.route("/get-user-lists/:username").get((req, res) => {
    List.find({
        $or: [ {"creator": username}, {"shared.user": username}]
    })
        .then(lists => res.status(200).json(lists))
        .catch(err => res.status(400).json("Error: " + err))
});

//Get a specific list
router.route("/:listID").get((req, res) => {
    List.findOne({ _id: req.params.listID})
        .then(list => {
            if (list === null) res.status(400).json(list)
            else res.status(200).json(user)
        })
        .catch(err => res.status(500).json("Error: " + err));
});

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
router.route("/delete-user/:listID").delete((req, res) => {
    List.findOne({_id: req.params.listID},
        { $pull: { shared: {user: req.body.user} } }
    )
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json("Error: " + err));
});

module.exports = router;
