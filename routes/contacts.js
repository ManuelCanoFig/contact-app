const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
//Calling the user model
const User = require('../models/User');
//Calling the Contact model
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');

// @route   GET api/contacts
// @desc    Get all contacts
// @access  Private
router.get('/', auth, async (req, res) =>{
   try {
      const contacts = await Contact.find({user: req.user.id}).sort({date:-1});
      res.json(contacts);
   } catch (error) {
      console.error(error);
      res.status(500).json({msg: 'Server error'});
   }
});

// @route   POST api/contacts
// @desc    Add a contact
// @access  Private
router.post('/', [auth, [
   check('name','Please add a name').not().isEmpty()
] ], async (req, res) =>{
   
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
         name: name,
         email: email,
         phone: phone,
         type: type,
         user: req.user.id
      })
      
      const contact = await newContact.save();
      res.json(contact);

    } catch (error) {
       console.log(error.message);
       res.status(500).json({msg: 'Sever error'});
    }

});

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', auth, async(req, res) =>{
   const {name, email, phone, type } = req.body;

   //Build contact objet
   const contactFields = {};
   if(name) contactFields.name = name;
   if(email) contactFields.email = email;
   if(phone) contactFields.phone = phone;
   if(type) contactFields.type = type;

   try {
      let contact = await Contact.findById(req.params.id);
      if(!contact){
         res.status(404).json({msg: 'Contact not find'});
      }
      //Make sure user owns contacts
      if(contact.user.toString() !== req.user.id){
         return res.status(401).json({msg: 'Not authorized'});
      } 
      contact = await Contact.findByIdAndUpdate(req.params.id,{$set:contactFields},{new:true});
      res.json(contact)
   } catch (error) {
      console.log(error.message);
      res.status(500).json({msg: 'Sever error'});
   }

});

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', auth, async(req, res) =>{
   try {
      let contact = await Contact.findById(req.params.id);
      if(!contact){
         res.status(404).json({msg: 'Contact not find'});
      }
      //Make sure user owns contacts
      if(contact.user.toString() !== req.user.id){
         return res.status(401).json({msg: 'Not authorized'});
      } 
      contact = await Contact.findByIdAndRemove(req.params.id);
      res.json({msg: 'Contact removed'});
   } catch (error) {
      console.log(error.message);
      res.status(500).json({msg: 'Sever error'});
   }
});


module.exports = router;