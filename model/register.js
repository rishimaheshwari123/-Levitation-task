const mongoose = require("mongoose");

const SchemaSignup = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true, 
    },
    password:{
        type:String,
        require:true,
    }
})

const Users = new mongoose.model("User" , SchemaSignup);

module.exports= Users;