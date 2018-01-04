const express = require("express");
const app = express();
const cors = require("cors");
const mongoose =  require("mongoose");
const conf = require("./conf");
const routes = require("./routes");

app.use(cors());
app.use("/",routes);

mongoose.connect(conf.db.mlab,{useMongoClient: true},err => {
    if(err){
        console.log(err);
        return;
    }
    console.log(conf.db.msg);
});

app.listen(conf.server.port,err =>  {
    if(err){
        console.log(err);
        return;
    }
    console.log(conf.server.msg);
})