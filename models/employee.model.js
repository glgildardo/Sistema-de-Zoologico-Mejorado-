'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    position: String,
    username: String,
    password: String,
    animals: [{
        name: String,
        types: String,
        age: String,
        number: Number,
        scientific_name: String
    }]
})

module.exports = mongoose.model('employee',userSchema);