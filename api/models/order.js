const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    quantity: { type: Number, default: 1 }

});

module.exports = mongoose.model('Order', orderSchema);