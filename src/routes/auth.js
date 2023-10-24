const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt'); // For password hashing
const { validateRegistration, validateLogin } = require('../middleware/validation'); // Create validation middleware
const { generateToken } = require('../middleware/authentication'); // Create authentication middleware
const User = require('../models/User'); // Create a User model for the database

router.post('/register', validateRegistration, async (req, res) => {
    try {
        const { username, email, password } = req.body;
        

    }
})