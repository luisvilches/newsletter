const {encrypt,decrypt,write,verificarToken,mail} = require("../libs");
const Model = require("../models/form");
const NodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

exports.post = (req,res) => {
    verificarToken(req.headers.programadoreschile).then(response => {
        if(response.status){

            let user = new Model({
                name:req.body.name,
                lastname:req.body.lastname,
                mail:req.body.mail,
                rut:req.body.rut,
                phone:req.body.phone,
                ciudad:req.body.ciudad,
                whatsapp:req.body.whatsapp,
                newsletter:req.body.newsletter,
            })

            user.save((err,result) => {
                mail(result).then(respuesta => {
                    res.status(200).json({msg:"gracias por preferirinos!"})
                })
            })

        } else {
            res.status(500).json({error:" no autorizado"})
        }
    });
}