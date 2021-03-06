var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
Config = require('../config/config');
var options = {
  auth: {
    api_user: 'rsn1994',
    api_key: 'rsn@1994'
  }
}
exports.sentMailVerificationLink = function(user,token) {
var client = nodemailer.createTransport(sgTransport(options));

var email = {
  from: Config.email.accountName+" Team<" + Config.email.username + ">",
  to: user,
  subject: "CONFIRM",
  text: 'Hello world',
  html: "<p>Thanks for Registering on "+Config.email.accountName+" </p><p>Please verify your email by clicking on the verification link below.<br/><a href='http://"+Config.server.host+":"+ Config.server.port+"/"+Config.email.verifyEmailUrl+"/"+token+"'>Verification Link</a></p>"
};

client.sendMail(email, function(err, info){
    if (err ){
      console.log(error);
    }
    else {
      console.log('Message sent: ' + info.response);
    }
});
};
