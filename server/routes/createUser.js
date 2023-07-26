const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.jwtSECRET;

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

        const salt = await bcrypt.genSalt(10);
        let securePass = await bcrypt.hash(req.body.pass, salt);

        try {
            await User.create({
                name: req.body.name,
                password: securePass,
                email: req.body.email,
                location: req.body.location,
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    }
)

router.post('/loginuser',
    [
        body('email', 'Invalid Email').isEmail(),
        body('pass', 'Password too short').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let userData = await User.findOne({ email: req.body.email });
            // console.log(userData);

            const passCompare = await bcrypt.compare(req.body.pass, userData.password);
            if (!userData || !passCompare) {
                console.log('hi');
                return res.status(400).json({ errors: "Invalid Credentials" });
            }

            const data = {
                user: {
                    id: userData._id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    }
)

module.exports = router;