const moongoose = require('mongoose');


const userSchema = new moongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    address: {
        street: { type: String, },
        city: { type: String, },
        state: { type: String,  },
        zipCode: { type: String,  },
        country: { type: String,  },
    },
    phone: { type: String, },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
});

const User = moongoose.model('User', userSchema);

module.exports = User;
