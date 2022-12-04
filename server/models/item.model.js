const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: {
        type: String,
        required: true,
        trim: true,
    },
    price: Number,
    category: {
        type: String,
        required: true
    },
    notes: String,
    checked: Boolean,
    listID: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;