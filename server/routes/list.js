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
                    creator: req.body.username
                });
                newList.save()
                    .then(() => res.status(200).json({listInfo: newList}))
                    .catch(err => res.status(500).json("Error: " + err));
            }
        })
        .catch(err => res.status(500).json("Error: " + err));
});

//Change list name
router.route("/update-name/:listID").post((req, res) => {
    List.updateOne({ _id: req.params.listID}, { $set: {listName: req.body.listName}})
        .then(() => res.status(200).json("New listname: " + req.body.listName))
        .catch(err => res.status(500).json("Error: " + err));
});

//Change budget of list
router.route("/update-budget/:listID").post((req, res) => {
    List.updateOne({ _id: req.params.itemID}, { $set: {budget: req.body.budget}})
        .then(() => res.status(200).json("New budget: " + req.body.budget))
        .catch(err => res.status(500).json("Error: " + err));
});

//Change or add user with permission 
router.route("/update-users/:listID").post((req, res) => {
    //add user
    List.updateOne(
        { _id: req.params.listID}, 
        {$set: 
            {shared: {user: req.body.user, permission: req.body.user.permission} }
        }
    )
        .then(() => res.status(200).json(("Added user: " + req.body.user + " with permission: " + req.body.permission)))
        .catch(err => res.status(500).json("Error: " + err));    
});

/*
    GET REQUESTS
*/

//Get all the lists of the user
router.route("/get-user-lists/:username").get((req, res) => {
    List.find({
        $or: [ {"creator": req.params.username}, {"shared.user": req.params.username}]
    })
        .then(lists => res.status(200).json(lists))
        .catch(err => res.status(400).json("Error: " + err))
});

//Get a specific list
router.route("/get-list/:listID").get((req, res) => {
    List.findOne({ _id: req.params.listID})
        .then(list => {
            if (list === null) res.status(400).json(list)
            else res.status(200).json(list)
        })
        .catch(err => res.status(500).json("Error: " + err));
});

/*
    DELETE REQUESTS
*/

//Delete list
router.route("/delete-list/:listID").delete((req, res) => {
    List.remove({ _id: req.params.listID})
        .then(() => res.status(200).json("Removed list"))
        .catch(err => res.status(500).json("Error: " + err));
});

//Delete a user
router.route("/delete-user/:listID").delete((req, res) => {
    List.update({_id: req.params.listID},
        { $pull: { shared: {user: req.body.user} } }
    )
    .then(() => res.status(200).json("Removed user: " + req.body.user))
    .catch(err => res.status(500).json("Error: " + err));
});

module.exports = router;
