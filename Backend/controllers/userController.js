import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/userSchema.js";
const login=async (req,res)=>{
    const {name,password}=req.body
   try{
     const user=await User.findOne({name:name});
    if(!user){
        return res.json({message:"user Not exists"});

    }
    let comparePassword=await bcrypt.compare(password,user.password);
    if(!comparePassword){
        return res.status(404).json({err:"in valid credentials"});
    }
    let token =jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    )
    return res.status(200).json({token:token});

   }catch(err){
    res.status(400).json({message:"Error in creating Signup from "});
        console.log(err);
   }
   
}
const signup=async (req,res)=>{
    const {name,email,password}=req.body;
    try{
       if(!email){
        return res.json({message:"enter user email"});
       }
       const user=await User.findOne({email});
       if(user){
        return res.json({message:"user already exists"});
       }
       const salt=await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(password,salt)
       let newUser=new User({
        name,
        email,
        password:hashedPassword,
       })
       newUser.save();
       const token=jwt.sign(
        {id:newUser._id},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}

       )
             console.log(token)

      return res.status(201).json({token:token})

    }catch(err){
        res.json(400).json({message:"Error in creating Signup from "});
        console.log(err);
    }
}

export default {login,signup}