const router = require("express").Router();

const io = require("../server").io;
const Item = require("../models/item.model");
const List = require("../models/list.model");

// Create item with category, ID of the list it belongs to
router.route("/add-item").post((req, res) => {
    const itemName = req.body.itemName;
    List.find({ _id: req.body.listID })
        .then(() => {
            const newItem = new Item({ itemName: itemName, category: req.body.category, listID: req.body.listID })
            newItem.save()
                    .then(() => res.status(200).json())
        })
        .catch(err => res.status(500).json("Error: " + err));
});

// Remove item, method: DELETE
router.route("/:itemID").delete((req, res) => {
    Item.remove({ _id: req.params.itemID })
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

// Change item name, method: POST
router.route("/:itemID").post((req, res) => {
    Item.updateOne({ _id: req.params.itemID }, { $set: { itemName: req.body.item } })
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

// Add/ Change price, method: POST
router.route("/update-price/:itemID").post((req, res) => {
    Item.updateOne({ _id: req.params.itemID }, { $set: {price: req.body.price } })
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

// Change category, method: POST
router.route("/update-category/:itemID").post((req, res) => {
    Item.updateOne({ _id: req.params.itemID }, { $set: {category: req.body.category } })
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

module.exports = router;