CREATE TABLE "user"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "nickname" TEXT NOT NULL UNIQUE,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT NOT NULL UNIQUE,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL, -- DOMAINE A CREER // user admin
    "status" TEXT NOT NULL, -- DOMAINE A CREER // activé / desactiver
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP  
);

CREATE TABLE "lesson"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,-- DOMAINE A CREER 'easy' 'normal' 'hard' 'expert"
    "teacher_id" INT NOT NULL,
    "plannified" TIMESTAMP,
    "link_videos" TEXT, -- CONTIENT LIEN VERS VIDEO YTB/ etc.. Pour cours non live
    "status" TEXT NOT NULL, -- DOMAINE A CREER / plannifié / commencer / finis / replay / supprimé
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);

CREATE TABLE "message"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "author_id" INT NOT NULL,
    "lesson_id" INT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL, --DOMAIN A CREER / lue, non-lue, supprimé, modifié
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);

CREATE TABLE "ask"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author_id" INT NOT NULL,
    "want_it" INT NOT  NULL,
    "level" TEXT NOT NULL, -- DOMAINE A CREER 'easy' 'normal' 'hard' 'expert'
    "status" TEXT NOT NULL, -- DOMAINE A CREER - actif / inactif
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);

CREATE TABLE "category"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "color" TEXT, -- FORMAT : #ffffff
    "description" TEXT,
    "status" INT NOT NULL, -- DOMAINE A CREER
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);

CREATE TABLE "lesson_has_category"(
    "lesson_id" INT NOT NULL REFERENCES "lesson"("id") ON DELETE CASCADE,
    "category_id" INT NOT NULL REFERENCES "category"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);

CREATE TABLE "ask_has_category"(
    "ask_id" INT NOT NULL REFERENCES "ask"("id") ON DELETE CASCADE,
    "category_id" INT NOT NULL REFERENCES "category"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);

CREATE TABLE "user_subscribe_ask"(
    "ask_id" INT NOT NULL REFERENCES "ask"("id") ON DELETE CASCADE,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);

CREATE TABLE "user_subscribe_lesson"(
    "lesson_id" INT NOT NULL REFERENCES "lesson"("id") ON DELETE CASCADE,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);

CREATE TABLE "user_like_message"(
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "message_id" INT NOT NULL REFERENCES "message"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);

-- RAJOUTER TABLE DE LIAISON USER LESSON