const dataMapper = require('../dataMapper');
const mail = require('../middlewares/mailer');

const mailController = {
    //
    subscribeToLesson: (req, res) => {
        dataMapper.getNextLessonList((error, data) => {
            if (error) {
                console.trace(error);
                return res.send(error);
            }
            if ( data.rowCount === 0) {
                return res.send("Il n'y a pas de cours");
            } 
            data.rows.forEach(element => {
                console.log(element.email);
                mail.subscribe(element.email);
            });     
            dataMapper.UpdateAfterEmail((error, data) => {
                if (error) {
                    console.trace(error);
                    return res.send(error);
                }
                dataMapper.deleteAllStatusEnvoye((error, data) => {
                    if (error) {
                        console.trace(error);
                        return res.send(error);
                    }
                });
            });
            return res.send('not done');
        });
    },
};
/*
UPDATE "user_subscribe_lesson"
SET status = 'envoyé'
WHERE lesson_id IN (
    SELECT lesson.id FROM lesson
    WHERE plannified BETWEEN now() AND now() + interval '2 hours'
    )
    */

module.exports = mailController;