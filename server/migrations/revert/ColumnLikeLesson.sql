-- Revert solidarite:ColumnLikeLesson from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "lesson" DROP COLUMN "like";

COMMIT;
