const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/v1/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    // .select('-password') leaves the password out of the response
    const user = await User.findById(req.user.id).select('-password -__v');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/v1/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      // User doesn't exist
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: `Invalid credentials or user doesn't exist` }],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const isMatch = await bcrypt.compare(password, user.password);

      // Password is incorrect
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: `Invalid credentials or user doesn't exist` }],
        });
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // res.send('User registered successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
