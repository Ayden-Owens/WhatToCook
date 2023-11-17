const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await Users.create({
            username: username,
            password: hashedPassword,
        });

        res.status(201).json({ user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({
            where: { username: username },
        });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.send({ message: 'Login successful', user });
            } else {
                res.status(401).json({ error: 'Wrong username/password combination' });
            }
        } else {
            res.status(404).json({ message: "User doesn't exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
