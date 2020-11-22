const dataMapper = require('../dataMapper');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const mail = require('../middlewares/mailer');
const jwtUtils = require('../utils/jwt.utils');

const authController = {

    // Génere la passPhrase Pour la fonction : askEmail / forgetPassword
    passPhrase: () => {
        let longueur = 256,
          character = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
          value = character[Math.floor(Math.random() * character.length)],
          compteur = 1,
          number = '1234567890'+character
        for (; compteur < longueur; compteur++) {
        value += number[Math.floor(Math.random() * number.length)];
        }
        return value;
    },
    // '/signup' => Affiche le formulaire d'inscription
    signupPage: (req, res) => {
        res.send('signup page');
    },
    // '/signup' => Recupere et traite les information du formulaire d'inscription
    signupAction: async (req, res) => {
        try {
            let randomRobot = Math.floor(Math.random() * 4) +1;
            const info = req.body;
            console.log('info', info)
            await dataMapper.checkEmail(info.email, (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                }
                let errorsList = [];
                const userMail = data.rowCount;
                console.log('userMail', userMail)
                if ( userMail === 1) {
                    errorsList.push('Cet email existe déjâ');
                }
                dataMapper.checkName(info.pseudo, (error, data) => {
                    if (error) {
                        console.trace(error);
                        res.send(error);
                    }
                    const userPseudo = data.rowCount;
                    if (userPseudo === 1) {
                        errorsList.push('Ce pseudo existe déjâ');
                    }
                    if (!info.pseudo) {
                        errorsList.push("Le pseudo ne peut pas etre vide");
                    }
                    if (!info.firstname) {
                        errorsList.push("Le prénom ne peut pas etre vide");
                    }
                    if (!info.lastname) {
                        errorsList.push("Le nom ne peut pas etre vide");
                    }
                    if (!emailValidator.validate(info.email)) {
                        errorsList.push("L'email n'est pas un email valide");
                    }
                    if (info.password.length < 8) {
                        errorsList.push("Le mot de passe doit contenir un minimum de 8 caracteres");
                    } if (!info.avatar) {
                        //errorsList.push("L avatar ne peut pas etre vide");
                        info.avatar = `https://robohash.org/${info.pseudo}?sets=set${randomRobot}`;
                    }
                    if (info.password !== info.confirmpassword ){
                        errorsList.push("Le mot de passe et la confirmation ne correspondent pas")
                    }
                    console.log('errorsList', errorsList)
                    if (errorsList.length === 0) {
                        const newUser = {
                            nickname: info.pseudo,
                            firstname: info.firstname,
                            lastname: info.lastname,
                            email: info.email,
                            password: bcrypt.hashSync(info.password, 10),
                            role: 'user',
                            status: 'a validé',
                            avatar: info.avatar
                        }
                        console.log('newUser', newUser)
                        dataMapper.registerNewUser(newUser, (error, data) => {
                            if (error) {
                                console.trace(error);
                                res.send(error);
                            }
                            if (data.rowCount === 1) {
                                res.send('Compte crée avec succes')
                                // lancement mail
                                console.log(newUser);
                                mail.mailer(newUser.email);
                            }
                        })

                    } else {
                        res.send(errorsList);
                    }
                });
            });
        } catch (error) {
            console.trace(error);
            res.send(error);
        }
    },
    // '/login' => Affiche le formulaire de connection
    showLoginForm: (req, res) => {
        res.send('login page');
    },
    // '/login' => Recupere et traite les information du formulaire de connection
    loginAction: async (req, res) => {
        try {
            const { email, password  } = req.body;
            await dataMapper.checkEmail(email, (error, data) => {
                 if (data.rowCount === 0) {

                     console.log('Cet email existe pas');
                     return res.status(401).end();
                 }
                let user = data.rows[0];
                // user.cookies = req.cookies
                let testPass = "";
                if (user) {
                 testPass = bcrypt.compareSync(password, user.password);
                }
                if (user && testPass) {
                    console.log('<< 200 OK', user);
                    //! test token --------------------
                    console.log('user.id :>> ', user.id);
                    user.token = jwtUtils.generateTokenForUser(user);
                    console.log('use after toke', user)
                    console.log('token', user.token)
                    //! fin test token ----------------
                    req.session.user = user;
                    res.send(user);
                } else {
                    console.log('<< 401 UNAUTHORIZED');
                    res.status(401).end();
                }
            })
        } catch (error) {
            console.log('<< 500 INTERNAL SERVER ERROR');
            console.trace(error);
            res.send(error);
        }
    },
    //'/activation/user/:email' => Met a jour dans la BDD le status du User
    activation: async (req, res) => {
        try {
            const emailAccount = req.params.email;
            dataMapper.updateStatusUser(emailAccount, (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                }
                res.send('Votre compte est activé.')
            });
        } catch (error) {
            console.trace(error);
            console.log(error);
        }
    },
    // '/forgetPassword' => Envoie un mail si il existe dans la BDD avec une passPhrase
    askEmail: async (req, res) => {
        try {
            const email = req.body.email;

            dataMapper.checkEmail(email, (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Cette email n'existe pas");
                }
                //const mail = data.rows[0];
                const passPhrase = authController.passPhrase();
                dataMapper.saveEmailPassPhrase(email, passPhrase, (error, data) => {
                    if (error) {
                        console.trace(error);
                        res.send(error);
                    }
                    const verif = {
                        email: email,
                        passphrase: passPhrase
                    };
                    mail.forgetPassword(verif);
                    res.send("Un email vous a était envoyé");
                });
            });
        } catch (error) {
            console.trace(error);
            console.log(error);
        }
    },
    // '/forgetPassword/:passPhrase' => Compare l'email entré et la passPhrase dans la BDD
    // pour s'assuré que c'est bien le proprietaire de l'adresse email = le compte
    forgetPassword: async (req, res) => {
        try {
            const passphrase = req.params.passPhrase;
            const email = req.body.email;
            const newpassword = bcrypt.hashSync(req.body.newpassword, 10);
            dataMapper.checkEmailPassphrase(email, passphrase, (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Cette email et ce passphrase ne correspondent pas");
                }
                dataMapper.newPassword(email, newpassword, (error, data) => {
                    if (error) {
                        console.trace(error);
                        res.send(error);
                    }
                    if (data.rowCount === 0) {
                        return res.send("Rien a était modifié");
                    }
                    //return res.send("Votre mot de passe a était modifié.")
                    // DELETE FROM "passphrase_check_email";
                    dataMapper.resetPasswordDone(email, (error, data) => {
                        if (error) {
                            console.trace(error);
                            res.send(error);
                        }
                        if (data.rowCount === 0) {
                            return res.send("Rien a était modifié");
                        }
                        res.send('Votre mot de passe a bien était modifié!')
                    });
                });
            });
        } catch (error) {
            console.trace(error);
            console.log(error);
        }
    },
    // DELETE FROM "passphrase_check_email";
    autoDeletePassphrase: async (req, res) => {
        try {
            dataMapper.resetAllPassphrase( (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Rien a était modifié");
                }
                return res.send('Passphrase Reinitialisé');
            });
        } catch (error) {
            console.trace(error);
            console.log(error);
        }
    }
};
module.exports = authController;