const mongoose = require('mongoose');

var schema = mongoose.Schema({
    author: String,
    subject: String,
    rating: Number,
    content: String,
    date: String
})

module.exports = mongoose.model("Review", schema)