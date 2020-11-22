-- Deploy solidarite:domain to pg

BEGIN;

-- XXX Add DDLs here.

CREATE DOMAIN DIFFICULTY AS TEXT
CHECK(
   VALUE ~ 'easy'
   OR VALUE ~ 'normal'
   OR VALUE ~ 'hard'
   OR VALUE ~ 'expert'
);

CREATE DOMAIN user_role AS TEXT
CHECK(
   VALUE ~ 'user'
   OR VALUE ~ 'admin'
);

CREATE DOMAIN actif AS TEXT
CHECK(
   VALUE ~ 'activé'
   OR VALUE ~ 'a validé'
   OR VALUE ~ 'desactivé'
);

CREATE DOMAIN status_lesson AS TEXT
CHECK(
   VALUE ~ 'plannifié'
   OR VALUE ~ 'commencé'
   OR VALUE ~ 'finis'
   OR VALUE ~ 'replay'
   OR VALUE ~ 'supprimé'
);

CREATE DOMAIN status_message AS TEXT
CHECK(
   VALUE ~ 'lue'
   OR VALUE ~ 'non-lue'
   OR VALUE ~ 'supprimé'
   OR VALUE ~ 'modifié'
);

CREATE DOMAIN status_ask AS TEXT
CHECK(
   VALUE ~ 'actif'
   OR VALUE ~ 'inactif'
);

ALTER TABLE "user" ALTER "role" TYPE user_role;
ALTER TABLE "user" ALTER "status" TYPE actif;
ALTER TABLE "lesson" ALTER "level" TYPE DIFFICULTY;
ALTER TABLE "lesson" ALTER "status" TYPE status_lesson;
ALTER TABLE "message" ALTER "status" TYPE status_message;
ALTER TABLE "ask" ALTER "level" TYPE DIFFICULTY;
ALTER TABLE "ask" ALTER "status" TYPE status_ask;




COMMIT;