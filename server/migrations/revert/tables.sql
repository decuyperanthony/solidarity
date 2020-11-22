-- Revert solidarite:tables from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE "user",
    lesson,
    "message",
    ask,
    category,
    lesson_has_category,
    ask_has_category,
    user_subscribe_ask,
    user_subscribe_lesson,
    user_like_message,
    user_want_lesson;

COMMIT;
