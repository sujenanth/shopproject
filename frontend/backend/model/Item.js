const mongoose = require('mongoose')


const itemTemplate = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    kategorie:{
        type: String,
        required: true
    },
    imageurl:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Item', itemTemplate)