const router = require("express").Router();

const io = require("../server").io;
const Item = require("../models/item.model");
const List = require("../models/list.model");

// Get all items in the list, method: POST
router.route("/get-items/:listID").get((req, res) => {
    Item.find({ listID: req.params.listID })
        .then(items => res.json(items))
        .catch(err => res.status(500).json("Error: " + err));
});

// Create item with category, ID of the list it belongs to
router.route("/add-item").post((req, res) => {
    List.findOne({ _id: req.body.listID })
        .then(list => {
            if (list === null) {
                res.status(400).json(`Error: no list with ID ${req.body.listID} exists`);
            } else {
                const newItem = new Item({
                    itemName: req.body.itemName,
                    category: req.body.category,
                    notes: req.body.notes || "",
                    price: req.body.price || 0,
                    listID: req.body.listID
                });
                newItem.save()
                    .then(() => res.status(200).json({itemInfo: newItem}))
                    .catch(err => res.status(500).json("Error: " + err));
            }
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
    Item.updateOne({ _id: req.params.itemID }, { $set: { price: req.body.price } })
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

// Change category, method: POST
router.route("/update-category/:itemID").post((req, res) => {
    Item.updateOne({ _id: req.params.itemID }, { $set: { category: req.body.category } })
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

// Add/ Change notes, method: POST
router.route("/update-notes/:itemID").post((req, res) => {
    Item.updateOne({ _id: req.params.itemID }, { $set: { notes: req.body.notes } })
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

// Change check status, method: POST
router.route("/checked/:itemID").post((req, res) => {
    Item.updateOne({ _id: req.params.itemID }, { $set: { checked: req.body.checked } })
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json("Error: " + err));
});

module.exports = router;