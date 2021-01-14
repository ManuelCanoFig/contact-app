const express = require('express');
const router = express.Router();
const bcrypt =  require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');


// @route   GET  api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) =>{
   try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
   } catch (error) {
      console.error(error.message);
      res.status(500).json({msg: 'Server Error'});
   }
});

// @route   POST  api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/',[
   check('email','Please include a valid email').isEmail(),
   check('password','Password required').exists()
], async (req, res) =>{
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   
   const {email, password} = req.body;

   try {
      let user = await User.findOne({email: email});
      if(!user){
         return res.status(400).json({msg: 'Invalid Credentials'});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
         return res.status(400).json({msg: 'Invalid Credentials'});
      }

      //Creating payload for jwt token
      const payload = {
         user:{
            id: user.id
         }
      }
      //Creating the jwt token
      jwt.sign(payload,config.get('jwtSecret'),{
         expiresIn: 36000
      }, (error, token) =>{
         if(error) throw error;
         res.json({token});
      });
      

   } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
   }

});

module.exports = router;