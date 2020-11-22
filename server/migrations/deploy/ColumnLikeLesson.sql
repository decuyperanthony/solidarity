-- Deploy solidarite:ColumnLikeLesson to pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "lesson" ADD COLUMN "like" INT NOT NULL DEFAULT 0;

COMMIT;
