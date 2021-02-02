require('dotenv').config()
const { PORT = 4000, NODE_ENV = "development" } = process.env;
const express = require('express')
const logger = require('morgan')
const app = express()

// Add the middleware code needed to accept incoming data and add it to req.body
app.use(logger('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//CORS
const cors = require("cors");
const corsOptions = require("./configs/cors.js");

////////////
//MIDDLEWARE
////////////
NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());


//Route for testing server is working
app.get("/", (req, res) => {
    res.json({ hello: "Hello World!" });
  });

 // --- IMPORT THE SHIKIGAMI CONTROLLER ---
const shikiRouter = require('./controllers/shikiRoutes.js')
app.use('/shiki/', shikiRouter)

// --- IMPORT THE ONMYOJI CONTROLLER ---
const onmyojiRouter = require('./controllers/onmyojiRoutes.js')
app.use('/onmyoji/', onmyojiRouter)


app.listen(4000, () => console.log('Server running on port 4000!'))