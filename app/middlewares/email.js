var nodemailer = require('nodemailer');

const sendEmail=(user,token)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your email',
            pass: 'your password'
        }
    })

    var mailOptions = {
          from: 'no-reply@gmail.com',
          to: user.email,
          subject: 'Password reset',
          html: `
          <p>You are receiving this because you (or someone else) have requested the reset of the password </p>
          <p>Please click on the following <a href="http://localhost:3006/reset-pass/${token}">link</a> to set a new password.</p>
          <p>If you did not request this, please ignore this email and your password will remain unchanged</p>
        `
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('An e-mail has been sent: ' + info.response);
        }
      });
    
}

module.exports = sendEmail