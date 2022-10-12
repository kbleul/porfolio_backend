require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const connectDB = require('./config/dbConn')
const Message = require("./messageModel")

const app = express()

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req , res , next) => { 
        console.log(req.path, req.method , req.body)     
        next()
    })
  
  connectDB()

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
  })


  app.use("/api/sendMessage", async (req , res) => {

    try {

        const newMessage = new Message(req.body);

        await newMessage.save();
        res.status(200).json({ "msg" : "Message Sent" });

    } catch { res.status(400).json({error : error.message}) }

  })