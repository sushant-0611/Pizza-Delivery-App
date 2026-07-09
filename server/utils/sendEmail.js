const transporter = require("../config/nodemailer");


const sendEmail = async (
    to,
    subject,
    html,
    text = ""
) => {

    try {


        const mailOptions = {

            from: `"🍕 Pizza Delivery Admin" <${process.env.EMAIL_USER}>`,

            to,

            subject,

            html,

            text: text || "Pizza Delivery Notification"


        };



        const info = await transporter.sendMail(
            mailOptions
        );



        console.log(
            `📧 Email sent successfully to ${to}`
        );


        console.log(
            "Message ID:",
            info.messageId
        );



        return true;



    } 
    catch(error){


        console.error(
            "❌ Email Sending Failed:",
            error.message
        );


        return false;


    }

};



module.exports = sendEmail;