const Mongoose = require("mongoose");

const Schema =  require("mongoose").Schema;


let Form = new Schema({
    name:String,
    lastname:String,
    mail:String,
    rut:String,
    phone:Number,
    ciudad:String,
    whatsapp:Boolean,
    newsletter:Boolean
});



module.exports = Mongoose.model("Form",Form);