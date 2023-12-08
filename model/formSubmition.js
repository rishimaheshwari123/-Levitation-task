const mongoose = require('mongoose');

const USerSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
    },
    phoneNo:{
        type:String,
    },
    address:{
        type:String, 
    },
    state:{
        type:String,  
    },
    country:{
        type:String,
    },
    pincode:{
        type:Number,
    },
    city:{
        type:String,
    },
    file:{
        type:[Object],  
    },
    select:{
        type:String,  
    },
    userId:{
        type:String,
    },
    date:{
        type:String,
        default:(new Date().toLocaleDateString())
    }
    
})

const UserInfo = new mongoose.model("UserInfo" , USerSchema);
module.exports = UserInfo;