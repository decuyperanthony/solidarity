-- Deploy solidarite:ImgCatLike0 to pg

BEGIN;

-- XXX Add DDLs here.

ALTER TABLE "category" ADD COLUMN "picture" TEXT;
UPDATE "category" SET "picture" = 'Pragmatique' WHERE "id" = 1;
UPDATE "category" SET "picture" = 'histoire' WHERE "id" = 2;
UPDATE "category" SET "picture" = 'Javascript' WHERE "id" = 3;
UPDATE "category" SET "picture" = 'Mathematiques' WHERE "id" = 4;
UPDATE "category" SET "picture" = 'biologie' WHERE "id" = 5;
UPDATE "category" SET "picture" = 'Geographie' WHERE "id" = 6;
UPDATE "category" SET "picture" = 'algebre' WHERE "id" = 7;
UPDATE "category" SET "picture" = 'bio_chimie' WHERE "id" = 8;
UPDATE "category" SET "picture" = 'espagnol' WHERE "id" = 9;
UPDATE "category" SET "picture" = 'allemand' WHERE "id" = 10;
UPDATE "category" SET "picture" = 'anglais' WHERE "id" = 11;
UPDATE "category" SET "picture" = 'sciences_sociales' WHERE "id" = 12;
UPDATE "category" SET "picture" = 'economie' WHERE "id" = 13;
UPDATE "category" SET "picture" = 'yoga' WHERE "id" = 14;
UPDATE "category" SET "picture" = 'philosophie' WHERE "id" = 15;
UPDATE "category" SET "picture" = 'Physique' WHERE "id" = 16;
UPDATE "category" SET "picture" = 'Informatique' WHERE "id" = 17;
UPDATE "category" SET "picture" = 'Marketing' WHERE "id" = 18;
UPDATE "category" SET "picture" = 'Geographie' WHERE "id" = 19;

COMMIT;
