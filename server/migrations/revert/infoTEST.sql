-- Revert solidarite:infoTEST from pg

BEGIN;

-- XXX Add DDLs here.

DELETE FROM "user";
DELETE FROM lesson;
DELETE FROM "message";
DELETE FROM ask;
DELETE FROM category;
DELETE FROM lesson_has_category;
DELETE FROM ask_has_category;
DELETE FROM user_subscribe_ask;
DELETE FROM user_subscribe_lesson;
DELETE FROM user_like_message;
DELETE FROM user_want_lesson;

COMMIT;
