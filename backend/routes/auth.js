const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//create a user using post"/api/auth"".Does,t require auth

//password not in plain text
const User = require("../models/User");
const bcrypt=require("bcryptjs");
const JWT =require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

//jwt 
//a way to verify user
//for login 
//3part 1red->algo token type
//2->data
//3-?signature;

//JWT AUTHENTICATE PROVIDES SECURE COMMUNICATION

const JWT_SECRET="inotebook"

//creating user route
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password should atleast 3 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //express-validator for validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

        //finding user with same email id
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry an user with this email already exists" });
      }
const salt=await bcrypt.genSalt(10);
const secpass= await bcrypt.hash(req.body.password,salt);
      //creating user using schema
      user=await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      })
      const data={
        user:{
            id:user.id,
        }
      }
      const authtoken=JWT.sign(data,JWT_SECRET);
      return res.json({authtoken})
       
    } catch (err) {
      console.log(err.message);
    return  res.status(500).json({error:"Some internal error has occured. "})
    }
  }
);

//login routing
router.post(
    "/login",
    [
      body("email", "Enter a valid Email").isEmail(),
      body("password", "Password Cannot be blank").exists(),
    ],
    async (req, res) => {
      //express-validator for validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {email,password}=req.body;
      try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }

        const data={
            user:{
                id:user.id,
            }
          }
          const authtoken=JWT.sign(data,JWT_SECRET);
          return res.json({authtoken})
           
        } catch (err) {
          console.log(err.message);
        return  res.status(500).json({error:"Some internal error has occured. "})
        }
  
    
    }
  );


  //get login user details using post
  //
  router.post('/getuser',fetchuser,async(req,res)=>{


  try{
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
   return res.status(200).json(user);

  }catch (err) {
    console.log(err.message);
  return  res.status(500).json({error:"Some internal error has occured. "})
  }
})
module.exports = router;




/*

webapp------->database[username,password]

hacker can hack db using username and pasword they can hack it.
if i want to avoid hacking->

backend will make hash of username and password
hash is one way function

harry----->[hash]->random string

limitation
ranbow table
many table

salt concept;
bcrypt.js for these functionality

pepper
it is hardocded in backen not in db.



*/