-- Revert solidarite:TableMDP from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE "passphrase_check_email";

COMMIT;
