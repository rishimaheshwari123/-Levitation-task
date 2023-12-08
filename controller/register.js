const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../model/register");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const SECRATE_KEY = process.env.SECRATE_KEY;




const postUser = async (req, res) => {
    try {
        const strongPass = await bcrypt.hash(req.body.password, 10);
        let user = await Users.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ status: "fail", field: "email", message: "Email already exist!!" })
        const data = new Users({
            name: req.body.name,
            email: req.body.email,
            password: strongPass
        })
        const createData = await data.save();
        res.status(201).json({ status: "success", data: createData });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};






const loginUser = async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            let matchPass = await bcrypt.compare(req.body.password, user.password)
            if (matchPass) {
                const token1 = await jwt.sign({ _id: user._id }, SECRATE_KEY);
                res.status(201).json({ status: "success", token: token1 });
            } else {
                res.status(400).send({ status: "fail", message: "User Deatils not match" })
            }
        } else {
            res.status(400).send({ status: "fail", message: "Users Deatils not match" })
        }
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
}







module.exports = { postUser, loginUser };