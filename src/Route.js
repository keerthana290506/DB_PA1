const express = require('express')
const bcrypt = require('bcrypt')
const User = require('./User')

const router = express.Router()

router.post('/register',async(req,res)=>{
    try{
        const{username,email,password} = req.body;

        if(!username|| !email ||!password){
            return res.status(400).json({error: 'All fields are required' })
        }

        const ExistingUser = await User.findOne({email});
        if(ExistingUser){
            return res.status(400).json({error: 'User already exists' })
        }
    
    
    const hashpassword = await bcrypt.hash(password,10)
    
    const newUser = new User({
        username,
        email,
        password: hashpassword,
      });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    }catch(err){
        console.error('Error in registration:', err.message)
    }
})

module.exports = router;