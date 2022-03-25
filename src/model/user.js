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
    admin:{
        type: Boolean,
        default: 'false'
    },
});

module.exports= mongosee.model("User",userSchema);