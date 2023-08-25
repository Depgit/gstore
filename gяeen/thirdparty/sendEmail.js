import { createTransport } from 'nodemailer';
import config from '../config/config';

const sendEmail = async (mailObj) => {
    const { from, to, subject, text } = mailObj;
    try {
        
        let transporter = createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            auth: {
                user: config.Config.Email.SendInBlue.Host,
                pass: config.Config.Email.SendInBlue.SecretKey
            },
        });
        let info = await transporter.sendMail({
            from: from,
            to: to, 
            subject: subject, 
            text: text, 
        });
        return `${info.messageId}`;
    } catch (error) {
        console.error(error);
        throw new Error(
            `Something went wrong in the send mail method.Error:${error.message}`
        );
    }
};

export default sendEmail;