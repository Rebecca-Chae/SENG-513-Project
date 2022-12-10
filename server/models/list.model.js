const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    budget: {
        type: Number
    },
    total: {
        type: Number
    },
    creator: {
        type: String,
        required: true
    },
    shared: [
        {
            user: {
                type: String,
                required: true,
                trim: true
            }, 
            permission: {
                type: String,
                required: true,
                trim: true}
        }
    ]
}, {
    timestamps: true
});

const List = mongoose.model("List", listSchema);
module.exports = List;
