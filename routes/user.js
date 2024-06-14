const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('../models/userModel'); // Ensure this path is correct based on your project structure
const app = express();
const router = express.Router();

app.use(express.json());


const createSuperUser = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (!existingAdmin) {
            const username = 'emmanuel';
            const email = 'emmanuel@meep.com';
            const password = '123456';
            const role = 'admin';

            const hashedPassword = await bcrypt.hash(password, 10);

            const superUser = new User({
                username,
                email,
                password: hashedPassword,
                role
            });

            await superUser.save();
            console.log('Super user created successfully');
        } else {
            console.log('Super user already exists');
        }
    } catch (err) {
        console.error('Error creating super user:', err);
    }
};

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/meep',
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.userId = user._id;
        res.json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
});

router.get('/api/protected', isAuthenticated, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = router;
