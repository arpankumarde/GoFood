const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.post('/createuser',
    [
        body('email', 'Invalid Email').isEmail(),
        body('name', 'Name too Short').isLength({ min: 5 }),
        body('pass', 'Password too short').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            await User.create({
                name: req.body.name,
                password: req.body.pass,
                email: req.body.email,
                location: req.body.location,
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;