import nodemailer from "nodemailer"

async function sendMail(gmail: string, password: string, receiver: string[], subject: string, text: string, html: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: gmail,
            pass: password
        },
    });
    let receivers = receiver.join(", ")

    const mailOptions = {
        from: `"Good Auth" ${gmail}`,
        to: receivers,
        subject,
        text,
        html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred:', error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

export {
    sendMail
}
