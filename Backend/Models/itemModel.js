const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        id: { 
            type: String, 
            required: "Id is required",
            unique: true
        }, 
        price: {
            type: Number,
            required: 'Price is required'
        },
    }, 
    {
        timestamps: true
    }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;