// Initlisation for being able to read environment variables
require("dotenv").config()


// Module Imports
const express = require('express')
const fs = require('fs');


// Reading File


// Router Intilisation
const router = express.Router()


router.get("/GetResLogs",
    async(req,res)=>{
            fs.readFile(process.env.RES_LOGS_PATH, 'utf8',(err,data)=>{
                if (err) {
                    res.status(500).json({success:false,message:`error reading the file\n${err}`})
                }
                res.status(200).json({Success:true,data:data})
            })
            
    }
)



// Exporting router for no errors
module.exports = router