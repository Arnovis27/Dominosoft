const mongosee= require("mongoose");

const userSchema= mongosee.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    },
});

module.exports= mongosee.model("User",userSchema);