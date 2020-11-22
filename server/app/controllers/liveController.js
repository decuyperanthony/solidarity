const dataMapper = require('../dataMapper');

const liveController = {

    // '/liveLesson' => Affiche tout les cours en live
    showAllLiveLesson: (req, res) => {
        dataMapper.getLiveLessonList((error, data) => { 
            if (error) {
                console.trace(error);
                res.send(error);
            }
            if (data.rowCount === 0) {
                return res.send('Pas de cour en live');
            }
            res.send('Les cours en live');
        });
    },
    // '/liveLesson/:id' => Affiche la tchatRoom du cours en question
    showThisLiveLesson: (req, res) => {
        const liveLessonId = req.params.id;
        dataMapper.getLesson(liveLessonId, (error, data) => { 
            if (error) {
                console.trace(error);
                res.send(error);
            }
            if (data.rowCount === 0) {
                return res.send('Pas de cour en live');
            }
            res.send(data.rows[0]);
        });
    },
    // '/calendar' =>  Affiche le calendrier des cours
    showCalendar: (req, res) => {

        dataMapper.getAllPlanedLesson((error, data) => { 
            if (error) {
                console.trace(error);
                res.send(error);
            }
            if (data.rowCount === 0) {
                return res.send('Pas de cour prévue');
            }
            res.send(data.rows);
        });
    },
    // '/user/:id/lesson/:Id/subscribe' => S'inscrire a une lesson
    subscribeLesson: (req, res) => {

       const userId = req.params.id;
       const lessonId = req.params.Id;

       dataMapper.getUserId(userId, (error, data) => {
        if (error) {
            console.trace(error);
            res.send(error);
        }
        if (data.rowCount === 1) {
            dataMapper.getLesson(lessonId, (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                }
                if (data.rowCount === 1) {
                dataMapper.checkSubLesson(userId, lessonId, (error, data) => {
                        if (error) {
                            console.trace(error);
                            res.send(error);
                        }
                        if (data.rowCount === 0) {
                            dataMapper.subToLesson(userId, lessonId, (error, data) => {
                                if (error) {
                                    console.trace(error);
                                    res.send(error);
                                }
                                if (data.rowCount === 1) {
                                    res.send('Vous etes bien inscrit');
                                }
                            });
                        } else {
                            dataMapper.unsubToLesson(userId, lessonId, (error, data) => {
                                if (error) {
                                    console.trace(error);
                                    res.send(error);
                                }
                                if (data.rowCount === 1 || data.rowCount > 1) {
                                    res.send("Vous n'etes plus inscrit");
                                }
                            });
                        }
                });
            } else {
                res.send("Ce cours n'existe pas");
            }
        });
        } else {
            res.send("Cette utilisateur n'existe pas");
        }
    });
    },
    // '/user/:id/ask/:Id/subscribe' => permet de "s'inscrire" (envoie un mail avant le cour(mail non traité))'
    likeAsk: (req, res) => {

        const userId = req.params.id;
        const askId = req.params.Id;
        dataMapper.getUserId(userId, (error, data) => {
            if (error) {
                console.trace(error);
                res.send(error);
            }
            if (data.rowCount === 1) {
                dataMapper.getOnlyAskId(askId, (error, data) => {
                    if (error) {
                        console.trace(error);
                        res.send(error);
                    }
                    if (data.rowCount === 1) {
                        dataMapper.checkSubAsk(userId, askId, (error, data) => {
                            if (error) {
                                console.trace(error);
                                res.send(error);
                            }
                            if (data.rowCount === 0) {                                 
                                dataMapper.subToAsk(userId, askId, (error, data) => {
                                    if (error) {
                                        console.trace(error);
                                        res.send(error);
                                    }
                                    if (data.rowCount === 0) {
                                         res.send("Vous n'etes pas inscrit");
                                    }
                                    if (data.rowCount === 1) {
                                        dataMapper.addOneLike(askId, (error, data) => {
                                            if (error) {
                                                console.trace(error);
                                                res.send(error);
                                            } else {
                                                return res.send("Un like en plus");
                                            }
                                            });
                                        }
                                    });
                                } else {
                                    dataMapper.unsubToAsk(userId, askId, (error, data) => {
                                        if (error) {
                                            console.trace(error);
                                            res.send(error);
                                        }
                                        if (data.rowCount === 1 || data.rowCount > 1) {
                                            dataMapper.deleteOneLike(askId, (error, data) => {
                                               if (error) {
                                                   console.trace(error);
                                                   return res.send(error);
                                               }
                                            });
                                        }
                                    });
                                    return res.send("Un like en moins");
                                }
                        });
                    } else {
                        res.send("Cette demande n'existe pas");
                    }
                });
            } else {
                res.send("Cette utilisateur n'existe pas")
            }
        });
     },
     likeLesson: (req, res) => {

        const userId = req.params.id;
        const lessonId = req.params.Id;
        dataMapper.getUserId(userId, (error, data) => {
            if (error) {
                console.trace(error);
                res.send(error);
            }
            if (data.rowCount === 1) {
                dataMapper.getLesson(lessonId, (error, data) => {
                    if (error) {
                        console.trace(error);
                        res.send(error);
                    }
                    if (data.rowCount === 1) {
                        dataMapper.checkLessonLike(userId, lessonId, (error, data) => {
                             if (error) {
                                 console.trace(error);
                                 res.send(error);
                             }
                             if (data.rowCount === 0) {                                 
                                 dataMapper.lessonLiked(userId, lessonId, (error, data) => {
                                     if (error) {
                                         console.trace(error);
                                         res.send(error);
                                     }
                                     if (data.rowCount === 0) {
                                         res.send("Vous n'etes pas inscrit");
                                     }
                                     if (data.rowCount === 1) {
                                        dataMapper.addOneLikeLesson(lessonId, (error, data) => {
                                            if (error) {
                                                console.trace(error);
                                                res.send(error);
                                            } else {
                                                return res.send("Un like en plus");
                                            }
                                            });
                                        }
                                    });
                                } else {
                                    dataMapper.unLikeLesson(userId, lessonId, (error, data) => {
                                        if (error) {
                                            console.trace(error);
                                            res.send(error);
                                        }
                                        if (data.rowCount === 1 || data.rowCount > 1) {
                                            dataMapper.deleteOneLikeLesson(lessonId, (error, data) => {
                                                if (error) {
                                                    console.trace(error);
                                                    res.send(error);
                                                }
                                            });
                                        }
                                    });
                                    return res.send("Un like en moins");
                                }
                        });
                    } else {
                        res.send("Cette demande n'existe pas");
                    }
                });
            } else {
                res.send("Cette utilisateur n'existe pas")
            }
        });
     },
};

module.exports = liveController;