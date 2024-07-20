// Initlisation for being able to read environment variables
require("dotenv").config()


// Importing Modules
const express = require('express')
const cors = require("cors")

// Initialisations
const app = express()
const port = process.env.EXPRESS_PORT


// Using cors for fetch API and json middleware to deal with json
app.use(cors())
app.use(express.json())


// Configuring Routes
app.use("/WebScan/Logs",require("./routes/GetLogs"))
app.use("/WebScan/ResLogs",require("./routes/GetResLogs"))


// Running the method to start the server
app.listen(port, () => {
  console.log(`WebScan listening on  http://localhost:${port}`)
})