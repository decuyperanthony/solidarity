const dataMapper = require('../dataMapper');

const lessonController = {

    // '/user/:id/lesson' => Recupere et traite les information
    addLesson: async  (req, res) => {
        try {
            const lessonInfo = req.body;
            const userId = req.params.id;
            let lessonStatus = null;

            let errorsList = [];
            await dataMapper.getUserId(userId, (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Cette utilisateur n'existe pas")
                }
                if (!lessonInfo.title) {
                    errorsList.push("Il manque un titre");
                }
                if (!lessonInfo.description) {
                    errorsList.push("Il manque une description");
                }
                if (!lessonInfo.level) {
                    errorsList.push("Vous n'avez pas indiqué la difficulté");
                }
                if (!lessonInfo.plannified) {
                    lessonInfo.plannified = null;
                }
                if (lessonInfo.plannified === null && !lessonInfo.videos) {
                    errorsList.push("Vous pouvez soit : plannifié votre cours, soit ajouté votre cours directement. Les cours vide ne sont pas autorisé");
                }
                if (!lessonInfo.videos) {
                    lessonInfo.videos = null;
                }
                if (lessonInfo.videos !== null && lessonInfo.plannified !== null) {
                    errorsList.push("Vous pouvez soit plannifié un live, soit ajouté une videos. Vous ne pouvez pas faire les deux en même temps.");
                }
                if (lessonInfo.plannified === null) {
                    lessonStatus = 'replay';
                }
                if (lessonInfo.plannified !== null) {
                    lessonStatus = 'plannifié';
                    //console.log(lessonStatus);
                }
                if (!lessonInfo.category) {
                    errorsList.push("Vous n'avez pas indiquer de category")
                }

                if (errorsList.length === 0) {
                    const newLesson = {
                        title: lessonInfo.title,
                        description: lessonInfo.description,
                        level: lessonInfo.level,
                        plannified: lessonInfo.plannified,
                        videos:lessonInfo.videos,
                        status: lessonStatus,
                        teacher_id: userId,
                    }
                    dataMapper.getLessonByName(lessonInfo.title, (error, data) => {
                        if (error) {
                            console.log(error);
                            res.send(error);
                        }
                        console.log(data);
                        if (data.rowCount === 1) {
                            return res.send("Erreur Titre déja utilisé");
                        }
                        dataMapper.addLessonOnDB(newLesson, (error, data) => {
                            if (error) {
                                console.log(error);
                                res.send(error);
                            }
                            if (data.rowCount === 1) {
                                //console.log('Cours enregistrer');
                                dataMapper.getLessonByName(lessonInfo.title, (error, data) => {
                                    if (error) {
                                        console.log(error);
                                        res.send(error);
                                    }
                                    if (data.rowCount === 0) {
                                        return res.send("Erreur category");
                                    }
                                    const newInfo = data.rows[0];
                                    console.log('newInfo', newInfo);
                                    dataMapper.checkCatName(lessonInfo.category, (error, data) => {
                                        if (error) {
                                            console.log(error);
                                            res.send(error);
                                        }
                                        if (data.rowCount === 0) {
                                            return res.send("Erreur category");
                                        }
                                        const categoryInfo = data.rows[0];
                                        console.log('categoryInfo',categoryInfo);
                                        dataMapper.addRelationLessonCategory(newInfo.id, categoryInfo.id, (error, data) => {
                                            if (error) {
                                                console.log(error);
                                                res.send(error);
                                            }
                                            return res.send(newInfo);
                                        });
                                    });
                                });
                            }
                        });
                    });
                } else {
                    res.send(errorsList);
                }
            });
        } catch (error) {
            console.trace(error);
            res.send(error);
        }
    },
    // '/user/:id/lesson/:Id' => Recupere  et traite les information du formulaire
    changeLesson: async (req, res) => {
        try {

            const userId = req.params.id;
            const lessonId = req.params.Id;
            const lessonInfo = req.body;
            let lessonStatus = null;

            let errorsList = [];

            await dataMapper.checkLessonId(lessonId, userId, (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Ce n'est pas votre cours.");
                }
                //console.log('verif',data.rows[0])
                const verifId = data.rows[0];


            if (!lessonInfo.title) {
                errorsList.push("Il manque un titre");
            }
            if (!lessonInfo.description) {
                errorsList.push("Il manque une description");
            }
            if (!lessonInfo.level) {
                errorsList.push("Vous n'avez pas indiqué la difficulté");
            }
            if (!lessonInfo.plannified) {
                lessonInfo.plannified = null;
            }
            if (lessonInfo.plannified === null && !lessonInfo.videos) {
                errorsList.push("Vous pouvez soit : plannifié votre cours, soit ajouté votre cours directement. Les cours vide ne sont pas autorisé");
            }
            if (!lessonInfo.videos) {
                lessonInfo.videos = null;
            }
            if (lessonInfo.videos !== null && lessonInfo.plannified !== null) {
                errorsList.push("Vous pouvez soit plannifié un live, soit ajouté une videos. Vous ne pouvez pas faire les deux en même temps.");
            }
            if (lessonInfo.plannified === null) {
                lessonStatus = 'replay';
            }
            if (lessonInfo.plannified !== null) {
                lessonStatus = 'plannifié';
                //console.log(lessonStatus);
            }
            if (errorsList.length === 0) {
                const changeLesson = {
                    title: lessonInfo.title,
                    description: lessonInfo.description,
                    level: lessonInfo.level,
                    plannified: lessonInfo.plannified,
                    videos:lessonInfo.videos,
                    status: lessonStatus,
                    teacher_id: userId,
                }
                dataMapper.getLessonByName(changeLesson.title, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    }
                    //console.log(data);
                    if (data.rowCount === 1) {
                        const verifName = data.rows[0];
                        if (verifName.id !== verifId.id){
                            return res.send("Erreur Titre déja utilisé");
                        }
                    }
                    dataMapper.updateLessonOnDB(changeLesson, lessonId, (error, data) => {
                        if (error) {
                            console.log(error);
                            res.send(error);
                        }
                        console.log(data)
                        if (data.rowCount === 1) {
                        res.send('Cours modifié');
                        }
                });
                });

            } else {
                res.send(errorsList);
            }
        });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
    // '/user/:id/lesson/:Id' => Supprimer son cour si on en est le propriétaire
    deleteLesson: async (req, res) => {
        try {
            const userId = req.params.id;
            const lessonId = req.params.Id;
            dataMapper.checkLessonId(lessonId, userId, (error, data) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Ce cours n'existe pas");
                }
                const lessonInfo = data.rows[0];
                console.log('lessonInfo', lessonInfo);
                dataMapper.deleteAllRelation(lessonInfo, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    }
                    dataMapper.deleteLessonFromDB(userId, lessonId, (error, data) => {
                        if (error) {
                            console.log(error);
                            res.send(error);
                        }
                        if (data.rowCount === 0) {
                            res.send("Ce n'est pas votre cours");
                        }
                        if (data.rowCount === 1) {
                            res.send('Cours supprimé')
                        }
                        console.log(data);
                    });
                });
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
    deleteAdminLesson: async (req, res) => {


        try {
            const { lessonId } = req.params;
            // const lessonId = req.params.lessonId;
            dataMapper.deleteAdminLesson(lessonId, (error, data) => {
                if (error) {
                    console.log('error in deleteLessonAdmin', error);
                    res.send(error);
                } else {
                    if (data.rowCount === 1) {
                        res.send('Cours supprimé')
                    }
                    console.log(data);
                }
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
    // '/user/:id/lesson/:Id/category' => Ajout d'une relation [Lesson:Category]
    addCategoryToLesson: async (req, res) => {
        try {

            const userId = req.params.id;
            const lessonId = req.params.Id;
            const infoCategory = req.body;

            dataMapper.checkCatName(infoCategory.name, (error, data) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Cette catégorie n'existe pas");
                }
                const category = data.rows[0];

                dataMapper.checkLessonId(lessonId, userId, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    }
                    if (data.rowCount === 0) {
                        return res.send("Ce n'est pas votre cours.");
                    }
                    dataMapper.checkIfRelationLessonCategoryExist(lessonId, category.id,(error, data) => {
                        if (error) {
                            console.log(error);
                            res.send(error);
                        }

                        //console.log(data.rows[0]);
                        if (data.rowCount >= 1){
                            return res.send("Cette relation existe déja");
                        }
                        dataMapper.addRelationLessonCategory(lessonId, category.id, (error, data) => {
                            if (error) {
                                console.log(error);
                                res.send(error);
                            }
                            if (data.rowCount === 0) {
                                return res.send("La relation n'a pas était ajouté");
                            }
                            if (data.rowCount === 1 || data.rowCount < 1) {
                                res.send("Category ajouté avec succes a votre cour.");
                            }
                        });
                    });
                });
            });

        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
    // '/user/:id/lesson/:Id/category/:ID' => Suppression d'une relation [Lesson:Category]
    deleteCategoryToLesson: async (req, res) => {
        try {

            const userId = req.params.id;
            const lessonId = req.params.Id;
            const categoryId = req.params.ID;

            dataMapper.checkLessonId(lessonId, userId, (error, data) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Ce n'est pas votre cours");
                }
                dataMapper.deleteLessonId(lessonId, categoryId, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    }
                    if (data.rowCount === 0) {
                        return res.send("La catégory n'existe pas");
                    }
                    if (data.rowCount === 1) {
                        return res.send("Cours supprimé avec succes");
                    }
                });

            });

        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
    // '/lesson/:id' => Affiche un cour en particulier par son id
    showThisLesson: (req, res) => {
        const lessonId = req.params.id;
        dataMapper.getLesson(lessonId, (error, data) => {
            if (error) {
                console.trace(error);
                res.send(error);
            }
            if (data.rowCount === 0) {
                return res.send('Pas de cour');
            }
            const lessonInfo = data.rows;
            dataMapper.getCategoryWithRelation(lessonId, (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send('Pas de category');
                }
                const categoryInfo = data.rows;
                console.log(categoryInfo);
                return res.send({lessonInfo, categoryInfo});
                //dataMapper.getOnlyRoomMessage(lessonId, (error, data) => {
                    //if (error) {
                    //   console.trace(error);
                     //   res.send(error);
                    //}
                    /*if (!data) {
                    }*/
                    //const messageInfo = data.rows;
                    //res.send(lessonInfo, categoryInfo, messageInfo)
                //});
                // SELECT * FROM "category" JOIN lesson_has_category ON category.id = category_id
            });
        });
    },
    showMessage: (req, res) => {
        const lessonId = req.params.id;
        dataMapper.getRoomMessage(lessonId, (error, data) => {
            if (error) {
                console.trace(error);
                res.send(error);
            }
            //console.log(data.rows);
            const messageTime = data.rows;
            res.send(messageTime);
        });
    },
};
module.exports = lessonController;