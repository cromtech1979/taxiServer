const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({

   
    distance: {type: Number, require: true },
    offlineTime: {type: Number, require: true},
    price: {type: Number, require: true},
    tDay: {type: Number},
    tNight: {type: Number},
    tIdle: {type: Number},
    tCall: {type: Number}
     
});

module.exports = mongoose.model('Settings', settingsSchema);