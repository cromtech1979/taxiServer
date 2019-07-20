const mongoose = require('mongoose');

const addresesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    lat: {type: Number },
    lng: {type: Number},
    locaton: {type: String, unique: true},
    address: {type: String, unique: true} 
})

module.exports = mongoose.model('Addreses', addresesSchema);