const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



async function sampleDataUser() {
    try {
        const count = await User.countDocuments();
        if (count === 0) {
            const adminPassword = await bcrypt.hash('admin123', 10);
            const sampleUser = new User ({
        
                    name: "Admin",
                    email:"admin@gmail.com",
                    password: adminPassword,
                    firstname: "Admin",
                    lastname: "User",
                    role: "admin",
                
            });
            await sampleUser.save();
            console.log("Sample user data populated successfully");
        }
    } catch (err) {
        console.error("Error populating sample user data:", err);
    }
}

module.exports = sampleDataUser;