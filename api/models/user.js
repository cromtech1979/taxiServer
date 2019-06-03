const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }, 
    status: {type: Boolean },
    facebookApiKey: {type: String},
    googleToken: {type: String},
    phoneNumber: {type: String},
    regDate: {type: Date},
    urlImage: {type: String},
    name: {type: String},
    role: {type: String, default: 'client'},
    latitude: {type: String },
    longitude: {type: String} 
});

module.exports = mongoose.model('User', userSchema);