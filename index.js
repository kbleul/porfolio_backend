require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
// const fileRoute = require("./Routes/fileRoutes")

let path = require('path');

const connectDB = require('./config/dbConn')
const Message = require("./messageModel")

// var static = require('node-static');
// var http = require('http');

// var file = new(static.Server)(__dirname);
//global.__basedir = __dirname;

const app = express()

    // app.use("/public", express.static(path.join(__dirname, 'public')));
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors());

    app.use((req , res , next) => { 
        console.log(req.path, req.method , req.body)     
        next()
    })
  
  connectDB()

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(4000, () => console.log(`Server running on port 4000`))
  })

   // middlewares
  app.post("/api/sendMessage", async (req , res) => {

    try {

        const newMessage = new Message(req.body);

        await newMessage.save();
        res.status(200).json({ "msg" : "Message Sent" });

    } catch(error) { res.status(400).json({error : error.message}) }

  })

  app.get("/api/resume/download", function (req, res) {
    console.log(`${__dirname}/public/files/resume.pdf`)
    const file = `${__dirname}/public/files/resume.pdf`;
     res.download(file);
  } )