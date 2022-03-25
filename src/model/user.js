const mongosee= require("mongoose");

const userSchema= mongosee.Schema({
    dui:{
        type: Number,
        default: 000000000,
        unique: true
    },
    first_name: {
        type: String,
        default: "xxxxxxxxx"
    },
    last_name: {
        type: String,
        default: "xxxxxxxxx"
    },
    phone:{
        type: Number,
        default: 000000000
    },
    birthday:{
        type: String,
        default: "xxxxxxxxx"
    },
    address:{
        type: String,
        default: "xxxxxxxxx"
    },
    vaccinate:{
        type: String,
        default: "xxxxxxxxx"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: '12345'
    },
    admin:{
        type: Boolean,
        default: 'false'
    },
});

module.exports= mongosee.model("User",userSchema);