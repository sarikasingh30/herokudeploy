const authenticate=require("../middlewares/authenticate");
const express=require("express");
const router=express.Router();
const Post=require("../models/post.model");

router.get("",authenticate,async(req,res)=>{
    try {
        req.body.userId=req.user._id;
        const post=await Post.find().lean().exec();
        return res.status(200).send({post});
    } catch (error) {
        return res.status(400).send({message:error.message});
    }   
});

router.get("/:postId",authenticate,async(req,res)=>{
    try {
        req.body.userId=req.user._id;
        const post=await Post.findById(req.params.postId).lean().exec();
        return res.status(200).send({post});
    } catch (error) {
        return res.status(400).send({message:error.message});
    }   
});

router.post("",authenticate,async(req,res)=>{
    try {
        req.body.userId=req.user._id;
        const post=await Post.create(req.body);
        return res.status(200).send({post});
    } catch (error) {
        return res.status(400).send({message:error.message});
    }   
});

router.patch("/:postid",authenticate, async(req,res)=>{
    try {
        // console.log(req.params);
        const post=await Post.findByIdAndUpdate(req.params.postid,req.body, {new:true});
        return res.status(201).send({post});
    } catch (error) {
        return res.status(400).send({message:error.message});
        
    }
});

router.delete("/:postid",authenticate, async (req,res)=>{
    try {
        const post=await Post.findByIdAndDelete(req.params.postid).lean().exec();
        return res.status(200).send({post});
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
});
module.exports=router;