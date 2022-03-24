const mongosee= require("mongoose");

const datosSchema= mongosee.Schema({
    dui:{
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone:{
        type: Number
    },
    birthday:{
        type: String
    },
    address:{
        type: String
    },
    vaccinate:{
        type: Boolean
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});

module.exports= mongosee.model("Datos",datosSchema);