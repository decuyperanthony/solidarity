-- Revert solidarite:ImgCatLike0 from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "category" DROP COLUMN "picture";

COMMIT;
