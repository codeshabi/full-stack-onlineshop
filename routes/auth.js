const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const sendEmail = require('../utils/sendEmail'); // Adjust the path as necessary
// Register route
router.post('/register', async (req, res) => {
    const {username, email, password, confirmPassword} = req.body;
    const errors = [];
    if (!username || !email || !password || !confirmPassword) {
        errors.push({msg: 'All fields are required'});
    }
    if (password !== confirmPassword) {
        errors.push({msg: 'Passwords do not match'});
    }

    if (password.length < 6) {
        errors.push({msg: 'Password must be at least 6 characters long'});
    }
    
    if(errors.length > 0) {
         res.render('register',{
             errors,
             username,
             email,
            firstName,
            lastName,
            title: 'Register - your Store'
            });
    } else{
        try{
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                errors.push({msg: 'Username or email already exists'});
                res.render('register', {
                    errors,
                    username,
                    email,
                    firstName,
                    lastName,
                    title: 'Register - your Store',
                });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    username,
                    email,
                    password: hashedPassword,
                    firstname,
                    lastname,
                });
                await newUser.save();
                
                await sendEmail(email, 'Welcome Our Store ',
                    `<h2>Welcome to Our Store, ${username}!</h2>
                    <p>Thank you for registering. We are excited to have you on board.</p>
                    <p>Best regards,</p>`);

            
                res.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/login');

            }
        } catch (error) {
            console.error('Error during registration:', error);
            req.flash('error_msg', 'An error occurred during registration. Please try again later.');
            res.redirect('/register');
        }
    }
    
});

// Login route
