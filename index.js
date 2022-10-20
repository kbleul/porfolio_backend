require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const fs =  require("fs");
// const fileRoute = require("./Routes/fileRoutes")

let path = require('path');

const connectDB = require('./config/dbConn')
const Message = require("./messageModel")

// var static = require('node-static');
// var http = require('http');

// var file = new(static.Server)(__dirname);
//global.__basedir = __dirname;

const app = express()

    app.use("/public", express.static(path.join(__dirname, 'public')));
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

  app.get("/download", async function (req, res) {
    cors({
      exposedHeaders: ['Content-Disposition'],
    }),

 console.log("add   ", `${__dirname}/public/files/resume.pdf` )
 
        try {
          const fileName = 'resume.pdf'
          const fileURL = `${__dirname}/public/files/resume.pdf`
          const stream = fs.createReadStream(fileURL);
          res.set({
            'Content-Disposition': `attachment; filename='${fileName}'`,
            'Content-Type': 'application/pdf',
          });
          stream.pipe(res);
        } catch (e) {
          console.error(e)
          res.status(500).end();
        }
      

      download()
    }
 )