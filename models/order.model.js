
const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderNumber: { type: String,  unique: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String},
        price: { type: Number },
        quantity: { type: Number,  },
        image:{type: String}

    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    shippingAddress: {
        firstName: { type: String },
        lastName: { type: String},
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String },
        phone: { type: String }
    },

    paymentMethod: { type: String, enum: ['credit_card', 'paypal', 'cash_on_delivery'], required: true },
    paymentStatus: { type: String, enum: ['paid', 'failed', 'pending'], default: 'pending' },
    stripePaymentId: { type: String },
    createdAt: { type: Date, default: Date.now },
    deliveryDate: { type: Date },
});



const Order = mongoose.model('Order', orderSchema);


module.exports = Order;






