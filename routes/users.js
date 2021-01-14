const express = require('express');
const router = express.Router();
const bcrypt =  require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
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
], async(req, res) =>{
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {name, email, password} = req.body;

    try {

      let user = await User.findOne({email: email});
      if(user){
         res.status(400).json({msg: 'Email already taken'})
      }

      user = new User({
         name: name,
         email: email,
         password: password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password,salt);

      await user.save();

      const payload = {
         user:{
            id: user.id
         }
      }
      
      jwt.sign(payload,config.get('jwtSecret'),{
         expiresIn: 36000
      }, (error, token) =>{
         if(error) throw error;
         res.json({'token':token});
      });
       
    } catch (error) {
       console.log(error.message);
       res.status(500).send('Server Error');
    }

});

module.exports = router;