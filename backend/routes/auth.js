const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')
require('dotenv').config()

const router = express.Router()

const createToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};


router.post('/signup', async (req, res) => {
    console.log(req.body);
    const { name, username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ error: 'Missing username or password'});

    try {
        const hashed = await bcrypt.hash(password, 10);

        const newUser = await User.create( { name, username: username.toLowerCase().trim() , password: hashed});

        const token = createToken(newUser);

        res.json({
            message: 'User created successfully',
            token,
            user: { id: newUser.id, username: newUser.username }
        });
    } 
    catch (err) {
        console.log(err)
        res.status(400).json({ error: 'Username already exists'})
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) 
        return res.status(400).json( { error: 'Missing username or password'});

    const user = await User.findOne({ where: { username: username.toLowerCase().trim() }});
    if (!user)
        return res.status(400).json( { error: 'Username does not exist' })

    const pass = await bcrypt.compare(password, user.password)
    if (!pass)
        return res.status(400).json( {error: 'Invalid password'})

    const token = createToken(user);
    res.json({
        message: 'Successfully logged in',
        token,
        user: {id: user.id, username: user.username }
    })
})

module.exports = router