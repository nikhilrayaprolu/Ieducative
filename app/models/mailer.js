var nodemailer = require('nodemailer');
var smtpConfig={
  host:'smtp.gmail.com',
  port:465,
  secure:true,
  
  auth:{
    user:'nikhil684',
    pass:'rayaprolu'
  }
}
var transporter=nodemailer.createTransport(smtpConfig);
exports.mailer=function(data,cb){


  transporter.sendMail({
    from: 'nikhil684@gmail.com', // sender address 
    to: data.to, // list of receivers 
    subject: data.subject, // Subject line 
    text: data.text, // plaintext body 
    html: data.htmlbody // html body 
}, function(error, info){
    if(error){
        return console.log(error);
        cb(err,null);
    }
    console.log('Message sent: ' + info.response);
    cb(null,"Message sent");
});
};
