const dataMapper = require('../dataMapper');

const homeController = {
    // /homePage' => Requete Profs / Cour / Category
    homePage: (req, res) => {
        dataMapper.getTeacherLessonCategory((error, data) => { // Requete pour recuperer USER
            if (error) {
                console.trace(error);
                res.send(error);
            }
            const dataUser = data.rows;
            res.send(dataUser);
        });

    },
    // get all users
    getAllUsers: (req, res) => {
        dataMapper.getAllUsers((error, data) => { // Requete pour recuperer USER
            if (error) {
                console.trace(error);
                res.send(error);
            }
            const dataUser = data.rows;
            res.send(dataUser);
        });

    },
    // /teacherList' => Affiche tout les profs
    showTeacher: (req, res) => {
        dataMapper.getTeacherList((error, data) => {

            if (error) {
                console.trace(error);
                res.send(error);
            }
            res.send(data.rows);
        });
    },
    // '/askList' => Affiche toute les question
    showAsk: (req, res) => {
        dataMapper.getAskList((error, data) => {
            if (error) {
                console.trace(error);
                res.send(error);
            }
            res.send(data.rows);
        });
    },
    // '/lessonList' => Affiche tout les cours
    showLesson: (req, res) => {


        dataMapper.getLessonList((error, data) => {
            if (error) {
                console.trace(error);
                res.send(error);
            }
            res.send(data.rows);
        });
    },
    // '/lessonList' => Affiche tout les cours par category (Non-Utilisé En front)
    showLessonByCategory: (req, res) => {
        const infoCategory =req.body;
        dataMapper.checkCatName(infoCategory.name, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            }
            if (data.rowCount === 0) {
                return res.send("Cette category n'existe pas");
            }
            const category = data.rows[0];
            dataMapper.getAllLessonByCategory(category, (error, data) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Il n'y a pas de cours dans cette category")
                }
                return res.send(data.rows);
            });
        });
    },
    // '/askList'  => Affiche les cours selon une category ( Non-Utilisé en front)
    showAskByCategory: (req, res) => {
        const infoCategory =req.body;
        dataMapper.checkCatName(infoCategory.name, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            }
            if (data.rowCount === 0) {
                return res.send("Cette category n'existe pas");
            }
            const category = data.rows[0];
            dataMapper.getAllAskByCategory(category, (error, data) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                if (data.rowCount === 0) {
                    return res.send("Il n'y a pas de question dans cette category")
                }
                return res.send(data.rows);
            });
        });
    },
    // '/categoryList' => Affiche toute les category
    showAllCategory: (req, res) => {
        dataMapper.getAllCategory((error, data) => {
            if (error) {
                console.trace(error);
                res.send(error);
            }
            if ( data.rowCount === 0) {
                return res.send('Nothing');
            }
            res.send(data.rows);


        });
    },
    getThisCategory: (req, res) => {
        const lessonId = req.params.id;
        dataMapper.getCategoryLesson(lessonId, (error, data) => {
            if (error) {
                console.trace(error);
                res.send(error);
            }
            if (data.rowCount === 0){
                res.send('Pas de category');
            }
            const lessonCategory = data.rows;
            res.send(lessonCategory);
        });
    },
    getRelationAsk: (req, res) => {
        dataMapper.getRelAsk((error, data) => {
            if (error) {
                console.trace(error);
                res.send(error);
            }
            if (data.rowCount === 0){
                res.send('Pas de relation');
            }
            const askRelation = data.rows;
            res.send(askRelation);
        });
    },
    getRelationLesson: (req, res) => {
        dataMapper.getRelLesson((error, data) => {
            if (error) {
                console.trace(error);
                res.send(error);
            }
            if (data.rowCount === 0){
                res.send('Pas de relation');
            }
            const lessonRelation = data.rows;
            res.send(lessonRelation);
        });
    },
};

module.exports = homeController;