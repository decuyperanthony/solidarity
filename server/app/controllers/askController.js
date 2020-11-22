 const dataMapper = require('../dataMapper');

const askController = {
    // '/user/:id/ask' => Ajouté une question
    addAsk: async  (req, res) => {
        try {
            // Recupere les infos du formulaire
            const askInfo = req.body;
            const authorId = req.params.id;
            // Tableau d'erreur
            let errorsList = [];
            // Je vérifie que ces champs ne sont pas vide
            if (!askInfo.title) {
                errorsList.push("Il manque un titre");
            }
            if (!askInfo.description) {
                errorsList.push("Il manque une description");
            }
            if (!askInfo.level) {
                errorsList.push("Vous n'avez pas indiqué la difficulté");
            }
            // Si la liste d'erreur est vide Alors je créer une nouvelle question
            // Avec les info du formulaire
            if (errorsList.length === 0) {
                const newAsk = {
                    title: askInfo.title,
                    description: askInfo.description,
                    level: askInfo.level,
                    status: 'actif',
                    author_id: authorId,
                    want_it: 1
                }
                // Requete a la BDD => Je vérifie que le titre est unique
                dataMapper.getAskByName(askInfo, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    }
                    if (data.rowCount === 1) {
                        return res.send("Erreur Titre déja utilisé");
                    }
                    // J'ajoute la question a la BDD
                    dataMapper.addAskOnDB(newAsk, (error, data) => {
                        if (error) {
                            console.log(error);
                            res.send(error);
                        }
                        console.log(data)
                        if (data.rowCount === 1) {
                            dataMapper.getAskByName(askInfo, (error, data) => {
                                if (error) {
                                    console.log(error);
                                    res.send(error);
                                }
                                if (data.rowCount === 0) {
                                    return res.send("Erreur category");
                                }
                                const newInfo = data.rows[0];
                                console.log('newInfo', newInfo);
                                dataMapper.checkCatName(askInfo.category, (error, data) => {
                                    if (error) {
                                        console.log(error);
                                        res.send(error);
                                    }
                                    if (data.rowCount === 0) {
                                        return res.send("Erreur category");
                                    }
                                    const categoryInfo = data.rows[0];
                                    console.log('categoryInfo',categoryInfo);
                                    dataMapper.addRelationAskCategory(newInfo.id, categoryInfo.id, (error, data) => {
                                        if (error) {
                                            console.log(error);
                                            res.send(error);
                                        }
                                        res.send("Cours et category ajouté"); 
                                    });
                                });
                            });
                        }
                    });
                });
            } else {
                res.send(errorsList);
            }
        } catch (error) {
            console.trace(error);
            res.send(error);
        }
    },
    // '/user/:id/ask/:Id' => Modifié une demande (titre, description...)
    changeAsk: async (req, res) => {
        try {

            const userId = req.params.id;
            const askId = req.params.Id;
            const askInfo = req.body;
            // Si modification = like reset ? 
            await dataMapper.checkAskId(askId, userId, (error, data) => {
                if (error) {
                    console.trace(error);
                    res.send(error);
                } 
                let errorsList = [];
                if (data.rowCount === 0) {
                    return res.send("Ce n'est pas votre demande.");
                }
                const verifId = data.rows[0];
                if (!askInfo.title) {
                    errorsList.push("Il manque un titre");
                }
                if (!askInfo.description) {
                    errorsList.push("Il manque une description");
                }
                if (!askInfo.level) {
                    errorsList.push("Vous n'avez pas indiqué la difficulté");
                }
                if (errorsList.length === 0) {
                    const changeAsk = {
                        title: askInfo.title,
                        description: askInfo.description,
                        author_id: userId,
                        want_it: 1,
                        level: askInfo.level,
                        status: 'actif',
                    }
                    dataMapper.getAskByName(askInfo, (error, data) => {
                        if (error) {
                            console.log(error);
                            res.send(error);
                        }
                        if (data.rowCount === 1) {
                            const verifName = data.rows[0];
                            if (verifName.id !== verifId.id) {
                                return res.send("Ce titre est déja utilisé");
                            }
                        }
                        dataMapper.updateAskOnDB(changeAsk, askId, (error, data) => {
                            if (error) {
                                console.log(error);
                                res.send(error);
                            }
                            console.log(data)
                            if (data.rowCount === 1) {
                            res.send('Demande modifié');
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
    // '/user/:id/ask/:Id' => Supprimez une demande Si on en est le propriétaire
    deleteAsk: async (req, res) => {
        try {
            const userId = req.params.id;
            const askId = req.params.Id;
            dataMapper.checkAskId(askId, userId, (error, data) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Cette demande n'existe pas");
                }
                const askInfo = data.rows[0];

                dataMapper.deleteAllRelationAsk(askInfo, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    }
                    dataMapper.deleteAskFromDB(userId, askId, (error, data) => {
                        if (error) {
                            console.log(error);
                            res.send(error);
                        }
                        if (data.rowCount === 0) {
                            return res.send("Ce n'est pas supprimé");
                        }
                        if (data.rowCount === 1) {
                            res.send("Demande Supprimé");
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
    // '/user/:id/ask/:Id/category' => Ajout d'une relation [Demande:Category]
    addCategoryToAsk: async (req, res) => {
        try {

            const userId = req.params.id;
            const askId = req.params.Id;
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
                
                dataMapper.checkAskId(askId, userId, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    }
                    if (data.rowCount === 0) {
                        return res.send("Ce n'est pas votre cours.");
                    }
                    dataMapper.checkIfRelationAskCategoryExist(askId, category,(error, data) => {
                        if (error) {
                            console.log(error);
                            res.send(error);
                        }
                        if (data.rowCount === 1 || data.rowCount > 1){
                            return res.send("Cette relation existe déja");
                        }
                        dataMapper.addRelationAskCategory(askId, category.id, (error, data) => {
                            if (error) {
                                console.log(error);
                                res.send(error);
                            }
                            if (data.rowCount === 0) {
                                return res.send("La relation n'a pas était ajouté");
                            }
                            if (data.rowCount === 1 || data.rowCount < 1) {
                                res.send("Category ajouté avec succes a votre demande.");
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
    // '/user/:id/ask/:Id/category/:ID' => Suppression d'une relation [demande:category]
    deleteCategoryToAsk: async (req, res) => {
        try {

            const userId = req.params.id;
            const askId = req.params.Id;
            const categoryId = req.params.ID;
            
            dataMapper.checkAskId(askId, userId, (error, data) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Ce n'est pas votre cours");
                }
                dataMapper.deleteAskId(askId, categoryId, (error, data) => {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    }
                    if (data.rowCount === 0) {
                        return res.send("La catégory n'existe pas");
                    }
                    if (data.rowCount === 1) {
                        return res.send("Demande de Cour supprimé avec succes");
                    }
                });
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
};

module.exports = askController;