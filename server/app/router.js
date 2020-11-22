// Require express
const express = require('express');
const router = express.Router();

// ESPACE DE REQUIRE POUR LES CONTROLLERS
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const lessonController = require('./controllers/lessonController');
const askController = require('./controllers/askController');
const userController = require('./controllers/userController');
const liveController = require('./controllers/liveController');
const mailController = require('./controllers/mailController');
// ESPACE DE REQUIRE POUR LES MIDDLEWARES

// LES ROUTES
router.get('/fnel', (req, res) => {
    res.send('hello antho')
})


// LES ROUTES DE CONNECTION
router.get('/signup', authController.signupPage);
router.get('/login', authController.showLoginForm);
router.post('/signup', authController.signupAction);
router.post('/login', authController.loginAction);
router.get('/activation/user/:email', authController.activation);
router.post('/forgetPassword', authController.askEmail);
router.post('/forgetPassword/:passPhrase', authController.forgetPassword);
router.get('/check', mailController.subscribeToLesson);
router.get('/forgetPassword/resetpassphrase', authController.autoDeletePassphrase);

// LES ROUTES D'AFFICHAGE
router.get('/users', homeController.getAllUsers)
router.get('/homePage', homeController.homePage);
router.get('/teacherList', homeController.showTeacher);
router.get('/lessonList', homeController.showLesson);
router.post('/lessonList', homeController.showLessonByCategory);
router.get('/askList', homeController.showAsk);
router.post('/askList', homeController.showAskByCategory);
router.get('/categoryList', homeController.showAllCategory);
router.get('/categoryList/:id', homeController.getThisCategory);
router.get('/relationAsk', homeController.getRelationAsk);
router.get('/relationLesson', homeController.getRelationLesson);



// LES ROUTES CONCERNANT LESSON
router.post('/user/:id/lesson', lessonController.addLesson);
router.patch('/user/:id/lesson/:Id', lessonController.changeLesson);
router.delete('/user/:id/lesson/:Id', lessonController.deleteLesson);
//!admin delete lesson
router.delete('/lesson/:lessonId', lessonController.deleteAdminLesson);
router.post('/user/:id/lesson/:Id/category', lessonController.addCategoryToLesson);
router.delete('/user/:id/lesson/:Id/category/:ID', lessonController.deleteCategoryToLesson);
router.get('/lessons/:id', lessonController.showThisLesson);
router.get('/messages/:id', lessonController.showMessage);

// LES ROUTES CONCERNANT ASK
router.post('/user/:id/ask', askController.addAsk);
router.patch('/user/:id/ask/:Id', askController.changeAsk);
router.delete('/user/:id/ask/:Id', askController.deleteAsk);
router.post('/user/:id/ask/:Id/category', askController.addCategoryToAsk);
router.delete('/user/:id/ask/:Id/category/:ID', askController.deleteCategoryToAsk);

// lES ROUTES CONCERNANT LE LIVE
router.get('/liveLesson', liveController.showAllLiveLesson);
router.get('/liveLesson/:id', liveController.showThisLiveLesson);
router.get('/calendar', liveController.showCalendar);
router.patch('/user/:id/lesson/:Id/subscribe', liveController.subscribeLesson);
router.patch('/user/:id/ask/:Id/like', liveController.likeAsk);
router.patch('/user/:id/lesson/:Id/like', liveController.likeLesson);

// LES ROUTES CONCERNANT LES USER
router.get('/profile/:id', userController.showProfile);
router.patch('/profiluser/:id', userController.changeProfile);
router.patch('/profiluser/:id/changeEmail', userController.changeEmail);
router.patch('/profiluser/:id/changePassword/:token', userController.changePassword);


// Route 404
router.use( (req,res) => {res.status(404).send('404')} );

module.exports = router;