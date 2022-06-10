const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category_name: {
        type: String,
        required: true
    },
    category_id : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "incategory"
    }]
},
    { timestamps: true }
);



module.exports = mongoose.model('category', categorySchema);