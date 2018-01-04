const fs = require("fs");
const path = require("path");
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = 'd6F3Efeq';
const NodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const conf = require("../conf");
const tmpAdmin = require("../mailtemplate/admin");
const tmpUser = require("../mailtemplate/user");


function encrypt(text,password){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
   
  function decrypt(text,password){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
   
  function write(line){
      fs.appendFile(path.join(path.resolve(),"tokens.txt"), line, err => {
          if(err){
              console.log("Error: ",err);
          } else {
             console.log("tokens agregado");
          }
      })
  }

  function verificarToken(token){
      return new Promise((resolve,reject) => {
        fs.readFile(path.join(path.resolve(),"tokens.txt"),'utf-8',(err,result) => {
            if(err){
                console.log(err);
            } else {
                var data = result.split("\n");
                for(var i = 0; i < data.length;i++){
                    var tokens =  data[i].split(";");
                    if(i == data.length - 1){
                        resolve({status:false}); 
                    } else {
                        if(token === tokens[0]){
                            resolve({tokens,status:true});
                        }    
                    }
                }
            }
        });
      });
}


function mail(data) {
    return new Promise((resolve,reject) => {
        let mailOptionsAdmin = {
            from: 'Comunidad',
            to: conf.mail.mail,
            subject: "Nuevo Usuario",
            html: tmpAdmin(data)
        };
        let mailOptionsUser = {
            from: 'Comunidad',
            to: data.mail,
            subject: "Bienvenido",
            html: tmpUser(data)
        };
    
        let transporter = NodeMailer.createTransport(smtpTransport({
            service: 'gmail',
            auth: {
                user: 'no.reply.videomanias@gmail.com',
                pass: 'videomanias2017'
            }
        }));
    
        transporter.sendMail(mailOptionsAdmin, function(error, info){
        if (error){
            console.log(error);
        } else {
            transporter.sendMail(mailOptionsUser, function(error, info){
                if (error){
                    console.log(error);
                } else {
                    resolve(true);
                }})
        }})
    })
}

  module.exports = {
    encrypt:encrypt,
    decrypt:decrypt,
    write:write,
    verificarToken:verificarToken,
    mail:mail
  }
