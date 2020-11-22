-- Revert solidarite:RelationLikeLesson from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE "user_like_lesson";

COMMIT;
