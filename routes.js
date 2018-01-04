const router = require("express").Router();
const ctrl =  require("./controllers");
const body = require("connect-multiparty")();
const {encrypt,decrypt,write} = require("./libs");
router.get("/",(req,res) => {
    res.status(200).json({msg:"success!"})
})


router.post("/newsletter",body,ctrl.newsletter.post);
router.post("/generatetoken",body,(req,res) => {
    write(`${encrypt(req.body.key,req.body.pass)};${req.body.key};${req.body.pass}\n`);
})


module.exports = router;

