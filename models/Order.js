const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  petId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  shipDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['placed', 'approved', 'delivered'],
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
