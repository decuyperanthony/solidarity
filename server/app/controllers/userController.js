const dataMapper =require('../dataMapper');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const sendMail = require('../middlewares/mailer');
const { verifyToken } = require('../utils/jwt.utils');
const jwtUtils = require('../utils/jwt.utils');


const userController = {

    // '/profile/:id' => Affiche le profile du user correspondant a l'id
    showProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            dataMapper.getUserId(userId, (error, data) => {
                if (error) {
                    console.log(error);
                    return res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Cette utilisateur n'existe pas");
                }
                res.send(data.rows);
            })
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
    // '/profiluser/:id' => Permet de modifié son profil
    changeProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            const info = req.body;
                await dataMapper.getUserId(userId, (error, data) => {
                    if (error) {
                        console.trace(error);
                        res.send(error);
                    }
                    if (data.rowCount === 0) {
                        return res.send("Cette utilisateur n'existe pas")
                    }
                    const user = data.rows[0];
                            dataMapper.checkName(info.nickname, (error, data) => {
                                if (error) {
                                    console.trace(error);
                                    res.send(error);
                                }
                                const nickname = data;
                                if (nickname.rowCount === 1 && user.nickname !== info.nickname) {
                                    return res.send('Ce pseudo existe déjâ');
                                }
                                    for (let [keyInfo, valueInfo] of Object.entries(info)) {
                                        if (!valueInfo) {
                                            console.log('info manquante')
                                        } else {
                                            user[keyInfo] = valueInfo;
                                        }
                                    }
                    dataMapper.updateUser(user,userId, (error, data) => {
                        if (error) {
                            console.trace(error);
                            res.send(error);
                        }
                        if (data.rowCount === 0 ) {
                            return res.send("Rien a était modifier")
                        }
                        return res.send("C'est bien mis a jour");
                    });
                });
            });
        } catch (error) {
            console.trace(error);
            res.send(error);
        }
    },
    changeEmail: async (req, res) => {
        try {
            const userId = req.params.id;
            const info = req.body;
            await dataMapper.getUserId(userId, (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Cette utilisateur n'existe pas")
                }
                const user = data.rows[0];
                dataMapper.checkEmail(info.email, (error, data) => {
                    if (error) {
                        console.trace(error);
                        res.send(error);
                    }
                    const mail = data.rows;
                    if (mail.rowCount === 1) {
                        errorsList.push("Cette email existe déja");
                    }
                    if (!bcrypt.compareSync(info.password, user.password ) ) {
                        return res.send("Error");
                    }
                    dataMapper.newEmail(info.email, userId, (error, data) => {
                        if (error) {
                            console.trace(error);
                            res.send(error);
                        }
                        sendMail.mailer(info.email);
                        res.status(200).send('Votre email a été modifié');
                    });
                });
            });
        } catch (error) {
            console.trace(error);
            res.send(error);
        }
    },
    changePassword: async (req, res) => {
        try {
            const userId = req.params.id;
            const userToken = req.params.token;
            console.log('userToken', userToken);
            const verifyToken = jwtUtils.verifyToken(userToken);
            console.log('verifyToken', verifyToken);
            if (userId === verifyToken.userId) {
                const info = req.body;
            await dataMapper.getUserId(userId, (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Cette utilisateur n'existe pas")
                }
                const user = data.rows[0];
                if (!bcrypt.compareSync(info.password, user.password ) ) {
                    return res.send("Error");
                }
                const password = bcrypt.hashSync(info.newPassword, 10);
                dataMapper.changePassword(password, userId, (error, data) => {
                    if (error) {
                        console.trace(error);
                        res.send(error);
                    }
                    res.status(200).send('Votre mot de passe a été modifié');
                });
            });
            }

        } catch (error) {
            console.trace(error);
            res.send(error);
        }
    }
};
module.exports = userController;