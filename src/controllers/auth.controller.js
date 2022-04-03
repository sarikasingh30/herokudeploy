const { body, validationResult } = require('express-validator');
const User=require("../models/user.model");
var jwt=require("jsonwebtoken");
require('dotenv').config();

generateToken=(user)=>{
    return jwt.sign({user}, process.env.JWT_SECRET_KEY);
}
const register=async(req,res)=>{
try {
    let user=await User.findOne({email:req.body.email});
    //Checking Whether email is there or not If there return the ERROR MESSAGE
    if(user){
        return res.status(401).send({message:"Email Already There"});
    }
    //If email is not there then create it or allow to register
    user=await User.create(req.body);

    const token=generateToken(user); //CALLING OF TOKEN
    
    return res.status(200).send({user, token});
} catch (error) {
    return res.status(400).send({message:error.message});
}
}




const login=async(req,res)=>{
    try {

        let user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(401).send({message:"Wrong Email or Password"});
        }
        else{
            // check the password
            const match=user.checkPassword(req.body.password);//provide the plaintxt 
                                                                //it return true/false
            if(!match){ //if it doesn't matches throw an error message
                return res.status(401).send({message:"Wrong Email or Password"});
            }
            //If matches then generate the token 
            const token=generateToken(user); //CALLING OF TOKEN
            return res.status(200).send({user, token});
        }
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
}
module.exports={register,login}