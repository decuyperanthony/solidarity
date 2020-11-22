-- Revert solidarite:domain from pg

BEGIN;

-- XXX Add DDLs here.

ALTER TABLE "user" ALTER "role" TYPE TEXT;
ALTER TABLE "user" ALTER "status" TYPE TEXT;
ALTER TABLE "lesson" ALTER "level" TYPE TEXT;
ALTER TABLE "lesson" ALTER "status" TYPE TEXT;
ALTER TABLE "message" ALTER "status" TYPE TEXT;
ALTER TABLE "ask" ALTER "level" TYPE TEXT;
ALTER TABLE "ask" ALTER "status" TYPE TEXT;

DROP DOMAIN user_role;
DROP DOMAIN actif;
DROP DOMAIN DIFFICULTY;
DROP DOMAIN status_lesson;
DROP DOMAIN status_message;
DROP DOMAIN status_ask;

COMMIT;
