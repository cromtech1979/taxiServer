const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
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
    phoneNumber: {type: String, default:''},
    regDate: {type: Date},
    urlImage: {type: String},
    name: {type: String},
    role: {type: String, default: 'driver'},
    latitude: {type: String },
    longitude: {type: String},
    orders: {type: Number, default: 0},
    online: {type: Boolean},
    regNumber: {type: String},
    carModel: {type: String },
    carMark: {type: String},
    lastActiviti: {type: Date},
    tDay: {
        tKm:  {type: Number , default: 0},
        tIdle: {type: Number, default: 0},
        tCall: {type: Number, default: 0},
        tFirst: {type: Number, default: 0}
    }, 
    tNight: {
        tKm:  {type: Number, default: 0},
        tIdle: {type: Number, default: 0},
        tCall: {type: Number, default: 0},
        tFirst: {type: Number, default: 0}
    }

});

module.exports = mongoose.model('Driver', driverSchema);