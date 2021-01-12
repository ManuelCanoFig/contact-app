const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//Calling the user model
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Publick
router.post('/', [
   check('name','Please add name').not().isEmpty(),
   check('email','Please enter a valid email').isEmail(),
   check('password','Please enter a password with 6 or more characteres').isLength({min: 6})
],(req, res) =>{
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

   res.send(req.body);
});

module.exports = router;