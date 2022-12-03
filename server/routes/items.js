const router = require("express").Router();

const io = require("../server").io;
const Item = require("../models/item.model");
const List = require("../models/list.model");

// Create item
router.route("/add-item").post((req, res) => {
    const itemName = req.body.itemName;
    List.find({ _id: req.body.listID })
        .then(() => {
            const newItem = new Item({ itemName: itemName })
            newItem.save()
        })
        .catch(err => res.status(500).json("Error: " + err));
});

// Remove item
router.route("/:itemID").delete((req, res) => {
    Item.remove({ _id: req.params.itemID })
        .then()
        .catch(err => res.status(500).json("Error: " + err));
});

// Change item name
router.route("/:itemID").patch((req, res) => {
    Item.update({ _id: req.params.itemID }, { $set: { itemName: req.body.item } })
        .then()
        .catch(err => res.status(500).json("Error: " + err));
});

// Add/ Change price
router.route("/update-price/:itemID").patch((req, res) => {
    Item.update({ _id: req.params.itemID }, { $set: {price: req.body.price } })
        .then()
        .catch(err => res.status(500).json("Error: " + err));
});

// Add/ Change category
router.route("/update-category/:itemID").patch((req, res) => {
    Item.update({ _id: req.params.itemID }, { $set: {category: req.body.category } })
        .then()
        .catch(err => res.status(500).json("Error: " + err));
});