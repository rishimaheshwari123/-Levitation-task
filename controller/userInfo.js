require("dotenv").config();
const UserInfo = require("../model/formSubmition")
const SECRATE_KEY = process.env.SECRATE_KEY;
const jwt = require("jsonwebtoken")




const userInfo = async(req,res)=>{
   try{
      if(req.headers.authorization){
         let userVar = await jwt.verify(req.headers.authorization , SECRATE_KEY);
         if(userVar){
          const data = new UserInfo ({file:[{
            url:req.file.path,
            imageId:req.file.filename
           }],userId:userVar._id,...req.body});
           const createData = await data.save();
           res.status(201).json({message:"success" , data:createData});
          }
         }
         else{
          res.status(401).json({ status:"fail" ,message:"User Not Othorised"})
        }
      }catch(err){
        res.status(400).json({status:"fail", message:"user info is not save"})
       }
   
};

const getUserInfo = async(req, res)=>{
  try {
    const data = await UserInfo.find();
    res.status(200).json({status:"success" , data:data});
  } catch (err) {
    res.status(400).json({status:"fail", message:err.message})
  }
} 



module.exports ={userInfo , getUserInfo}