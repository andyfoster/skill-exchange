const express = require('express');
const router = express.Router();
const { check, body, validationResult } = require('express-validator');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    body('name').trim().escape(),
    body('email').trim().escape(),
    body('password').trim().escape(),
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name is too short').isLength({ min: 2 }),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check(
      'password',
      'Please enter a password of 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('Hi ' + req.body.name);
  }
);

module.exports = router;
