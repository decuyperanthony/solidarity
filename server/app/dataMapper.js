// Require ma connection a la DB
const db_connection = require('./db_connection');

// Je creer mon dataMapper :

const dataMapper = {

//!  /// \\\  ****** ///\\\
//!  /// \\\  SELECT ///\\\
//!  /// \\\  ****** ///\\\

//? /// \\\ USER     ///\\\

    checkEmail: (email, callback) => {
        const query = 'SELECT * FROM "user" WHERE email = $1';
        const values = [email];
        db_connection.query(query, values, callback);
    },
    checkName: (name, callback) => {
        const query = 'SELECT * FROM "user" WHERE nickname = $1';
        const values = [name];
        db_connection.query(query, values, callback);
    },
    getUserId: (userId, callback) => {
        const query = 'SELECT * FROM "user" WHERE "id" = $1';
        const values = [userId];
        db_connection.query(query, values, callback);
    },
    getAllUsers: (callback) => {
        const query = 'SELECT * FROM "user" ORDER BY "id" DESC';

        db_connection.query(query, callback);
    },
//? /// \\\ LESSON   ///\\\

    checkLessonId: (lessonId, userId, callback) => {
        const query = `SELECT * FROM "lesson" WHERE "id" = $1 AND teacher_id = $2;`;
        const values = [lessonId, userId];
        db_connection.query(query, values, callback);
    },
    getLessonList: (callback) => {
        const query = //'SELECT * FROM "lesson" ORDER BY "like" DESC';
        `SELECT DISTINCT ON ("lesson"."id", "lesson"."like")
        "lesson"."id", "lesson"."like",
        "lesson".title, "lesson".description,
        "lesson".teacher_id, "lesson".plannified,
        "lesson"."level",
        category.picture
        FROM "lesson"
        JOIN lesson_has_category ON lesson.id = lesson_id
        JOIN category ON category_id = category.id
        ORDER BY "like" DESC`;
        db_connection.query(query, callback);
    },
    getNextLessonList: (callback) => {
        const query = `SELECT * FROM "user"
        JOIN user_subscribe_lesson ON "user".id = user_id
        JOIN "lesson" ON lesson_id = lesson.id
        WHERE plannified BETWEEN now() AND now() + interval '2 hours' AND user_subscribe_lesson.status = 'todo'`;
        db_connection.query(query, callback);
    },
    getLessonByName: (title, callback) => {
        const query = `SELECT * FROM "lesson" WHERE "title" = $1`;
        const values = [title];
        db_connection.query(query, values, callback);
    },
    getLiveLessonList: (callback) => {
        const query = `SELECT * FROM "lesson" WHERE "status" = 'live'`;
        db_connection.query(query, callback);
    },
    getLesson: (lessonId, callback) => {
        const query = `SELECT * FROM "lesson" WHERE "id" = $1`;
        const values = [lessonId];
        db_connection.query(query, values, callback);
    },
    getAllPlanedLesson: (callback) => {
        const query = `SELECT * FROM "lesson" WHERE "status" = 'plannifié'`;
        db_connection.query(query, callback);
    },
    checkLessonLike: (userId, lessonId, callback) => {
        const query = 'SELECT * FROM "user_like_lesson" WHERE "user_id" = $1 AND "lesson_id" = $2';
        const values = [userId, lessonId];
        db_connection.query(query, values, callback);
    },
//? /// \\\ CATEGORY ///\\\

    getAllCategory: (callback) => {
        const query = 'SELECT * FROM "category"';
        db_connection.query(query, callback);
    },
    checkCatName: (categoryName, callback) => {
        const query = 'SELECT * FROM "category" WHERE "name" = $1'
        const values = [categoryName];
        db_connection.query(query, values, callback);
    },
    getCategoryLesson: (lessonId, callback) => {
        const query = `SELECT * FROM "category"
        JOIN lesson_has_category ON category.id = category_id
        JOIN lesson ON lesson_id = lesson.id
        WHERE lesson.id = $1;`
        const values = [lessonId];
        db_connection.query(query, values, callback);
    },
    getCategoryWithRelation: (lessonId, callback) => {
        const query = `SELECT * FROM "category"
        JOIN lesson_has_category ON category.id = category_id
        JOIN lesson ON lesson_id = lesson.id
        JOIN "user" ON "teacher_id" = "user".id
        WHERE lesson.id = $1;`
        const values = [lessonId]
        db_connection.query(query, values, callback);
    },
//? /// \\\ ASK      ///\\\

    getAskList: (callback) => {
        const query = 'SELECT * FROM "ask" ORDER BY want_it DESC';
        db_connection.query(query, callback);
    },
    checkAskId: (askId, userId, callback) => {
        const query = `SELECT * FROM "ask" WHERE "id" = $1 AND author_id = $2;`;
        const values = [askId, userId];
        db_connection.query(query, values, callback);
    },
    getOnlyAskId: (askId, callback) => {
        const query = `SELECT * FROM "ask" WHERE "id" = $1`;
        const values = [askId];
        db_connection.query(query, values, callback);
    },
    getAskByName: (askInfo, callback) => {
        const query = `SELECT * FROM "ask" WHERE "title" = $1`;
        const values = [askInfo.title];
        db_connection.query(query, values, callback);
    },
//? /// \\\ MESSAGE  ///\\\

    getMessage: (callback) => {
        const query = 'SELECT * FROM "message" JOIN "user" ON author_id = "user".id';
        db_connection.query(query, callback);
    },
    getRoomMessage: (lessonId, callback) => {

        const query = `SELECT "message".id, "author_id", "lesson_id", "content", "message"."status", "message".created_at, "user"."nickname"
        FROM "message"
        JOIN "user" ON author_id = "user".id WHERE "lesson_id" = $1
        ORDER BY "message".created_at ASC`;
        const values = [lessonId]
        db_connection.query(query, values, callback);
    },
    getOnlyRoomMessage: (lessonId, callback) => {
        const query = 'SELECT * FROM "message" WHERE "lesson_id" = $1';
        const values = [lessonId]
        db_connection.query(query, values, callback);
    },

//? /// \\\ LIAISON  ///\\\
    // ENVOIE ENORME OBJET -- Peut etre a modifier pour ne pas avoir de doublons
    getTeacherLessonCategory: (callback) => {
        const query = 'SELECT * FROM "user" JOIN "lesson" ON "user".id = lesson.teacher_id JOIN "lesson_has_category" ON "lesson".id = lesson_id JOIN "category" ON "lesson_has_category".category_id = "category".id WHERE "teacher_id" IS NOT NULL AND category_id IS NOT NULL';
        db_connection.query(query, callback);
    },
    getTeacherList: (callback) => {
        const query = 'SELECT DISTINCT "user".id, nickname,firstname, lastname,avatar FROM "user" JOIN lesson ON "user".id = lesson.teacher_id WHERE "teacher_id" IS NOT NULL';
        db_connection.query(query, callback);
    },
    checkIfRelationLessonCategoryExist: (lessonId, category, callback) => {
        const query = 'SELECT * FROM lesson_has_category WHERE lesson_id = $1 AND category_id = $2';
        const values = [lessonId, category];
        db_connection.query(query, values, callback);
    },
    getAllLessonByCategory: (category, callback) => {
        const query = 'SELECT * FROM lesson JOIN lesson_has_category ON "id" = lesson_id WHERE category_id=$1';
        const values = [category.id];
        db_connection.query(query, values, callback);
    },
    getAllAskByCategory: (category, callback) => {
        const query = 'SELECT * FROM ask JOIN ask_has_category ON "id" = ask_id WHERE category_id=$1';
        const values = [category.id];
        db_connection.query(query, values, callback);
    },
    checkIfRelationAskCategoryExist: (askId, category, callback) => {
        const query = 'SELECT * FROM ask_has_category WHERE ask_id = $1 AND category_id = $2';
        const values = [askId, category.id];
        db_connection.query(query, values, callback);
    },
    checkEmailPassphrase: (email, passphrase, callback) => {
        const query = 'SELECT * FROM "passphrase_check_email" WHERE "email" = $1 AND "passPhrase" = $2';
        const values = [email, passphrase];
        db_connection.query(query, values, callback);
    },
    checkSubLesson: (userId, lessonId, callback) => {
        const query = 'SELECT * FROM "user_subscribe_lesson" WHERE "user_id" = $1 AND "lesson_id" = $2';
        const values = [userId, lessonId];
        db_connection.query(query, values, callback);
    },
    checkSubAsk: (userId, askId, callback) => {
        const query = 'SELECT * FROM "user_subscribe_ask" WHERE "user_id" = $1 AND "ask_id" = $2';
        const values = [userId, askId];
        db_connection.query(query, values, callback);
    },
    getRelAsk: (callback) => {
        const query = 'SELECT * FROM "user_subscribe_ask"';
        db_connection.query(query, callback);
    },
    getRelLesson: (callback) => {
        const query = 'SELECT * FROM "user_subscribe_lesson"';
        db_connection.query(query, callback);
    },


//!  /// \\\  ****** ///\\\
//!  /// \\\  UPDATE ///\\\
//!  /// \\\  ****** ///\\\

//? /// \\\ USER     ///\\\

    updateStatusUser: (emailAccount, callback) => {
        const query = `UPDATE "user" SET "status" = 'activé' WHERE "email" = $1`;
        const values = [emailAccount];
        db_connection.query(query, values, callback);
    },
    updateUser: (updateUser, userId, callback) => {
        const query = `UPDATE "user" SET ("nickname", "firstname", "lastname", "email", "avatar","password", "role", "status") = ($1,$2,$3,$4,$5,$6,$7,$8) WHERE "id" = $9`
        const values = [updateUser.nickname, updateUser.firstname,updateUser.lastname,updateUser.email, updateUser.avatar, updateUser.password, updateUser.role, updateUser.status, userId];
        db_connection.query(query, values, callback);
    },
    newPassword: (email, newpassword, callback) => {
        const query = 'UPDATE "user" SET "password" = $2 WHERE "email" = $1;';
        const values = [email, newpassword];
        db_connection.query(query, values, callback);
    },
    changePassword: (password, userId, callback) => {
        const query = 'UPDATE "user" SET "password" = $1 WHERE "id" = $2;';
        const values = [password, userId];
        db_connection.query(query, values, callback);
    },
    newEmail: (email, userId, callback) => {
        const query = 'UPDATE "user" SET ("email","status") = ($1,$2) WHERE "id" = $3;';
        const values = [email, 'a validé', userId];
        db_connection.query(query, values, callback);
    },
//? /// \\\ LESSON   ///\\\

    updateLessonOnDB: (changeLesson, lessonId, callback) => {
        const query = `UPDATE "lesson" SET ("title", "description", "level", "teacher_id", "plannified", "link_videos", "status") = ($1,$2,$3,$4,$5,$6,$7) WHERE "id" = $8`
        const values = [changeLesson.title, changeLesson.description, changeLesson.level,changeLesson.teacher_id, changeLesson.plannified, changeLesson.videos, changeLesson.status, lessonId];
        db_connection.query(query, values, callback);
    },
    addOneLikeLesson: (lessonId, callback) => {
        const query = `UPDATE "lesson" SET "like" = "like"+1 WHERE "id" = $1`
        const values = [lessonId];
        db_connection.query(query, values, callback);
    },
    deleteOneLikeLesson: (lessonId, callback) => {
        const query = `UPDATE "lesson" SET "like" = "like"-1 WHERE "id" = $1`
        const values = [lessonId];
        db_connection.query(query, values, callback);
    },
//? /// \\\ CATEGORY ///\\\

//? /// \\\ ASK      ///\\\

    updateAskOnDB: (changeAsk, askId, callback) => {
        const query = `UPDATE "ask" SET ("title", "description", "author_id", "want_it", "level", "status") = ($1,$2,$3,$4,$5,$6) WHERE "id" = $7`
        const values = [changeAsk.title, changeAsk.description,changeAsk.author_id,changeAsk.want_it, changeAsk.level, changeAsk.status, askId];
        db_connection.query(query, values, callback);
    },
    deleteOneLike: (askId, callback) => {
        const query = `UPDATE "ask" SET "want_it" = "want_it"-1 WHERE "id" = $1`
        const values = [askId];
        db_connection.query(query, values, callback);
    },
    addOneLike: (askId, callback) => {
        const query = `UPDATE "ask" SET "want_it" = "want_it"+1 WHERE "id" = $1`
        const values = [askId];
        db_connection.query(query, values, callback);
    },
//? /// \\\ MESSAGE  ///\\\

//? /// \\\ LIAISON  ///\\\
    UpdateAfterEmail: (callback) => {
        const query =   `UPDATE "user_subscribe_lesson"
                         SET status = 'envoyé'
                         WHERE lesson_id IN (
                                SELECT lesson.id FROM lesson
                                WHERE plannified BETWEEN now() AND now() + interval '2 hours'
                            )`
        db_connection.query(query, callback)
    },

//!  /// \\\  ****** ///\\\
//!  /// \\\  INSERT ///\\\
//!  /// \\\  ****** ///\\\

//? /// \\\ USER     ///\\\

    registerNewUser: (newUser, callback) => {
        const query = 'INSERT INTO "user"("nickname","firstname","lastname","email","avatar","password","role","status")VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
        const values = [newUser.nickname, newUser.firstname, newUser.lastname, newUser.email,
        newUser.avatar,newUser.password, newUser.role, newUser.status,];
        db_connection.query(query, values, callback);
    },
//? /// \\\ LESSON   ///\\\

    addLessonOnDB: (newLesson, callback) => {
        const query = `INSERT INTO  "lesson"("title", "description", "level", "teacher_id", "plannified", "link_videos", "status") VALUES($1,$2,$3,$4,$5,$6,$7)`;
        const values = [newLesson.title, newLesson.description, newLesson.level,newLesson.teacher_id, newLesson.plannified, newLesson.videos, newLesson.status];
        db_connection.query(query, values, callback);
    },
    lessonLiked: (userId, lessonId, callback) => {
        const query = 'INSERT INTO "user_like_lesson" ("user_id", "lesson_id") VALUES ($1,$2)';
        const values = [userId, lessonId];
        db_connection.query(query, values, callback);
    },
//? /// \\\ CATEGORY ///\\\

//? /// \\\ ASK      ///\\\

    addAskOnDB: (newAsk, callback) => {
        const query = `INSERT INTO  "ask"("title", "description", "author_id", "want_it", "level", "status") VALUES($1,$2,$3,$4,$5,$6)`;
        const values = [newAsk.title, newAsk.description, newAsk.author_id,newAsk.want_it, newAsk.level, newAsk.status];
        db_connection.query(query, values, callback);
    },
//? /// \\\ MESSAGE  ///\\\
    putMsgOnDb: (message, userId, lessonId, callback) => {
        const query = `INSERT INTO "message"("content", "author_id", "lesson_id", "status")VALUES($1,$2,$3,$4)`;
        const values = [message, userId, lessonId, 'lue'];
        db_connection.query(query, values, callback);
    },
//? /// \\\ LIAISON  ///\\\

    addRelationLessonCategory: (lessonId, categoryId, callback) => {
        const query = 'INSERT INTO lesson_has_category ( "lesson_id", "category_id") VALUES ($1,$2)';
        const values = [lessonId, categoryId];
        db_connection.query(query, values, callback);
    },
    addRelationAskCategory: (askId, categoryId, callback) => {
        const query = 'INSERT INTO ask_has_category ( "ask_id", "category_id") VALUES ($1,$2)';
        const values = [askId, categoryId];
        db_connection.query(query, values, callback);
    },
    subToLesson: (userId, lessonId, callback) => {
        const query = 'INSERT INTO "user_subscribe_lesson" ("user_id", "lesson_id", "status") VALUES ($1,$2,$3)';
        const values = [userId, lessonId,'todo'];
        db_connection.query(query, values, callback);
    },
    subToAsk: (userId, askId, callback) => {
        const query = 'INSERT INTO "user_subscribe_ask" ("user_id", "ask_id") VALUES ($1,$2)';
        const values = [userId, askId];
        db_connection.query(query, values, callback);
    },
    saveEmailPassPhrase: (email, passPhrase, callback) => {
        const query = 'INSERT INTO "passphrase_check_email" ("email", "passPhrase") VALUES($1, $2)';
        const values = [email, passPhrase];
        db_connection.query(query, values, callback);
    },

//!  /// \\\  ****** ///\\\
//!  /// \\\  DELETE ///\\\
//!  /// \\\  ****** ///\\\

//? /// \\\ USER     ///\\\

//? /// \\\ LESSON   ///\\\

    deleteLessonFromDB: (userId, lessonId, callback) => {
        const query = 'DELETE FROM lesson * WHERE "id" = $2 AND teacher_id = $1;';
        const values = [userId, lessonId];
        db_connection.query(query, values, callback);
    },
    deleteAdminLesson: (lessonId, callback) => {
        const query = 'DELETE FROM lesson * WHERE "id" = $1;';
        const values = [lessonId];
        db_connection.query(query, values, callback);
    },
    unLikeLesson: (userId, lessonId, callback) => {
        const query = 'DELETE FROM "user_like_lesson" * WHERE "user_id" = $1 AND "lesson_id" = $2';
        const values = [userId, lessonId];
        db_connection.query(query, values, callback);
    },
    //? /// \\\ CATEGORY ///\\\

    //? /// \\\ ASK      ///\\\

    deleteAskFromDB: (userId, askId, callback) => {
        const query = 'DELETE FROM ask * WHERE "id" = $2 AND author_id = $1;';
        const values = [userId, askId];
        db_connection.query(query, values, callback);
    },
    //? /// \\\ MESSAGE  ///\\\

    //? /// \\\ LIAISON  ///\\\

    deleteLessonId: (lessonId, categoryId, callback) => {
        const query = 'DELETE FROM lesson_has_category * WHERE lesson_id = $1 AND category_id = $2';
        const values = [lessonId, categoryId];
        db_connection.query(query, values, callback);
    },
    deleteAllRelation: (lessonInfo, callback) => {
        const query = 'DELETE FROM "lesson_has_category" * WHERE "lesson_id" = $1';
        const values = [lessonInfo.id];
        db_connection.query(query, values, callback);
    },
    deleteAskId: (askId, categoryId, callback) => {
        const query = 'DELETE FROM ask_has_category * WHERE ask_id = $1 AND category_id = $2';
        const values = [askId, categoryId];
        db_connection.query(query, values, callback);
    },
    unsubToLesson: (userId, lessonId, callback) => {
        const query = 'DELETE FROM "user_subscribe_lesson" * WHERE "user_id" = $1 AND "lesson_id" = $2';
        const values = [userId, lessonId];
        db_connection.query(query, values, callback);
    },
    unsubToAsk: (userId, askId, callback) => {
        const query = 'DELETE FROM "user_subscribe_ask" * WHERE "user_id" = $1 AND "ask_id" = $2';
        const values = [userId, askId];
        db_connection.query(query, values, callback);
    },
    deleteAllRelationAsk: (askInfo, callback) => {
        const query = 'DELETE FROM "ask_has_category" * WHERE "ask_id" = $1';
        const values = [askInfo.id];
        db_connection.query(query, values, callback);
    },
    deleteAllStatusEnvoye: (callback) => {
        const query = `DELETE FROM lesson * WHERE "status" = 'envoyé'`;
        db_connection.query(query, callback);
    },


//!  /// \\\  ****** ///\\\
//!  /// \\\  OTHERS ///\\\
//!  /// \\\  ****** ///\\\
    resetPasswordDone: (email, callback) => {
        const query = 'DELETE FROM "passphrase_check_email" WHERE email = $1';
        const values = [email];
        db_connection.query(query, values, callback);
    },
    resetAllPassphrase: (callback) => {
        const query = 'DELETE FROM "passphrase_check_email"';
        db_connection.query(query, callback);
    }

};

// J'exporte mon module
module.exports = dataMapper;