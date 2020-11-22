-- Deploy solidarite:AlterSubscribe to pg

BEGIN;

-- XXX Add DDLs here.
CREATE DOMAIN subMail AS TEXT
CHECK(
   VALUE ~ 'envoyé'
   OR VALUE ~ 'todo'
);


ALTER TABLE "user_subscribe_lesson" ADD COLUMN "status" subMail;


COMMIT;
