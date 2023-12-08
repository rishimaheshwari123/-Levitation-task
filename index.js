require("dotenv").config();
const express = require('express');
const cors = require("cors");
const connectDB = require("./utils/db")
const path = require("path")
// rest object 
const app = express();
connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", require("./router/auth"));
app.use("/api/v1/userInfo", require("./router/userInfo"));

// static file 
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port no  ${PORT}`);
})