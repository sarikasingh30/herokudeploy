const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,required:true},
    password:{type:String,required:true},
},{
    timestamps:true,
    versionKey:false

});

    userSchema.pre("save", function(next){ 
        const hash = bcrypt.hashSync(this.password, 8);
        this.password=hash;
        return next();
    });
// make a method of userSchema and is already got imported to authorcontroller
    userSchema.methods.checkPassword= function (password){
            return bcrypt.compareSync(password, this.password); 
           
    }
const User=mongoose.model("user",userSchema);


module.exports=User;
