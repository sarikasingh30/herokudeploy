// const { body, validationResult } = require('express-validator');
const express=require("express");
const connect=require("./configs/db");
const userController=require("./controllers/user.controller");
const postController=require("./controllers/post.controller");
const {register,login}=require("./controllers/auth.controller");
const app=express();
var cors = require('cors');
 
app.use(cors())
app.use(express.json());
// console.log("Hello")

app.use("/users",userController);
app.post("/register",register);
app.post("/login",login);
app.use("/posts", postController);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(8000, async()=>{
    try {
        await connect();
        console.log("Listening to port 4000");
    } catch (error) {
        console.log("Something went wrong",error);

    };
})