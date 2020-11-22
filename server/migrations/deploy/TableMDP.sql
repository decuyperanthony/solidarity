-- Deploy solidarite:TableMDP to pg

BEGIN;

-- XXX Add DDLs here.
CREATE TABLE "passphrase_check_email"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passPhrase" TEXT NOT NULL,
    "status" ACTIF, -- DOMAINE A CREER // activé / desactiver
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP 
);

COMMIT;
