const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const productschema = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    image: {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('product',productschema);