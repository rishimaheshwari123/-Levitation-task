const express = require("express");
const Router = express.Router();
const multer = require("multer")
const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { userInfo, getUserInfo } = require("../controller/userInfo")
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

//   *********
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'User-Info',
  },
});
const upload = multer({
  storage: storage
})
const middleware = upload.single("file");



Router
  .route('/')
  .post(middleware, userInfo)
  .get(getUserInfo)


module.exports = Router;