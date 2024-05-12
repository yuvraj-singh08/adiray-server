const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin.js');

// adminRegister admin 
const adminRegister = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await admin.find({ username: username });
        if (user.length > 0) {
            return res.status(400).json({ message: "user already exists. " });
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newAdmin = new admin({
            username,
            password: passwordHash
        });
        const savedadmin = await newAdmin.save();
        res.status(201).json(savedadmin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// LOGGING IN 

const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await admin.findOne({ username });
        console.log(user);
        if (!user) return res.status(400).json({ message: "user does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        delete user.password;
        res.status(200).json({ token, user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { adminRegister, adminLogin };