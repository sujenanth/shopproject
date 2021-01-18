const mongoose = require('mongoose')


const teacherTemplate = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required: true
    },
    username : {
        type : String,
        required : false
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Teacher', teacherTemplate)