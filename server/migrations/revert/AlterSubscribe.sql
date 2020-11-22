-- Revert solidarite:AlterSubscribe from pg

BEGIN;

-- XXX Add DDLs here.

ALTER TABLE "user_subscribe_lesson" DROP COLUMN "status";
DROP DOMAIN subMail;
COMMIT;
