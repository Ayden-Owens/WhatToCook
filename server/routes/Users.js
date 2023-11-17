const express = require("express")
const router = express.Router()
const { Users } = require("../models")

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const newUser = await Users.create({
            username, 
            email, 
            password,
        })
        res.status(201).json({ user: newUser })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// Login
router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body
        const foundUser = await Users.findOne({
            where: { username, password },
        })

        if (foundUser) {
            res.json({ message: 'Login successful', user: foundUser })
        }
        else {
            res.status(401).json({ error: 'Invalid credentials' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router