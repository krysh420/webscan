// Initlisation for being able to read environment variables
require("dotenv").config()


// Module Imports
const express = require('express')
const { open } = require('node:fs/promises');


// Router Intilisation
const router = express.Router()


router.get("/GetLogs",
    async(req,res)=>{
        const file = await open(process.env.LOGS_PATH);
        let arr = []
        for await (const line of file.readLines()) {
              let obj = {}
              obj.line=line
              arr = [...arr,obj]
        }
        res.status(200).json({success:true,data:arr})
            
    }
)



// Exporting router for no errors
module.exports = router