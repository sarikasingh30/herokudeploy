const express=require("express");
const authenticate=require("../middlewares/authenticate");
const User=require("../models/user.model")
const router=express.Router();

router.get("/:userId",authenticate,async(req,res)=>{
    try {
        req.body.userId=req.user._id;
        const user=await User.findById(req.params.userId).lean().exec();
        return res.status(200).send({user});
    } catch (error) {
        return res.status(400).send({message:error.message});
    }   
});
module.exports=router;