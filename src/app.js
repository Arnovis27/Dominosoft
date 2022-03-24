const express= require("express");
const app= express();
const logger= require("morgan");
const port= process.env.PORT || 3000;
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const path= require("path");
require("dotenv").config();

//requeriment
const ruta= require("./routes/index");

//settings
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

//middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));

//database
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to MongoDB Atlas.");
}).catch((error)=> console.error(error));

//rutas
app.use(ruta);

app.listen(port, (req,res)=>{
    console.log("Run in the port ",port);
});