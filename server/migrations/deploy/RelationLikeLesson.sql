-- Deploy solidarite:RelationLikeLesson to pg

BEGIN;

-- XXX Add DDLs here.
CREATE TABLE "user_like_lesson"(
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "lesson_id" INT NOT NULL REFERENCES "lesson"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);
COMMIT;
