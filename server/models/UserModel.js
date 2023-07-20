const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    username: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    image: {
        type : String
    },
    created_on: {
        type : Date,
        default : Date.now
    },
    last_online: {
        type : Date,
        default : Date.now
    },
    credits: {
        type : Number,
        default : 0
    },
    xp: {
        type : Number,
        default : 0
    }

});


module.exports = User = mongoose.model('user', UserSchema);

