const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_name: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "incategory",
        required : true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
},
    { timestamps: true }
);



module.exports = mongoose.model('product', carSchema);