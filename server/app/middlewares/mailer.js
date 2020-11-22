const nodemailer = require('nodemailer');

const mail = {

    mailer: async (req, res) => {
        try {

            let testAccount = await nodemailer.createTestAccount();

            let transporter = nodemailer.createTransport( {
                service: "Gmail",
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.MAILPASS
                },
                tls: {
                    rejectUnauthorized: false,
                }

            });
            let info = await transporter.sendMail({
                from: '"Team Solidarité " <solidarite.no.reply@gmail.com>',
                to: `${req}`,
                subject: "Activation de Compte",
                text: "Bienvenue sur notre, il ne reste plus qu'a activé ton compte pour profité pleinement du site.",
                html: `<p>Cliquez <a href="http://localhost:8888/activation/user/${req}">ici</a> pour activé votre compte.</p>`
            });
            console.log("Message sent: %s ", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (error) {
            console.trace(error);
            res.send(error);
        }
    },
    forgetPassword: async (req, res) => {
        try {
            const email = req.email;
            const passphrase = req.passphrase;
            console.log('passphrase', passphrase);
            console.log('email', email);

            let testAccount = await nodemailer.createTestAccount();

            let transporter = nodemailer.createTransport( {
                service: "Gmail",
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.MAILPASS
                },
                tls: {
                    rejectUnauthorized: false,
                }

            });
            let info = await transporter.sendMail({
                from: '"Team Solidarité " <solidarite.no.reply@gmail.com>',
                to: `${email}`,
                subject: "Mot de passe oublié?",
                text: "Vous avez indiquez avoir oublié votre mot de passe.",
                html: `<p>Cliquez <a href="http://localhost:8888/forgetPassword/${passphrase}">ici</a> pour modifié votre mot de passe.</p>`
            });
            console.log("Message sent: %s ", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (error) {
            console.trace(error);
            res.send(error);
        }
    },
    subscribe: async (req, res) => {
        try {
            const email = req;
            console.log('email', email);

            let testAccount = await nodemailer.createTestAccount();

            let transporter = nodemailer.createTransport( {
                service: "Gmail",
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.MAILPASS
                },
                tls: {
                    rejectUnauthorized: false,
                }

            });
            let info = await transporter.sendMail({
                from: '"Team Solidarité " <solidarite.no.reply@gmail.com>',
                to: `${email}`,
                subject: "Bientôt l'heure ! :D",
                text: "Vous vous etes inscrit a un cours.",
                html: `<p>Votre cours commence bientôt !</p>`
            });
            console.log("Message sent: %s ", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (error) {
            console.trace(error);
            res.send(error);
        }
    }
};

module.exports = mail;