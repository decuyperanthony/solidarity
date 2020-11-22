-- Deploy solidarite:PlusDinfo to pg

BEGIN;

-- XXX Add DDLs here.
INSERT INTO "user" ("nickname", "firstname", "lastname", "email", "avatar", "password", "role", "status") VALUES
('Kirsten.Johnston','Kirsten', 'Johnston', 'Kirsten.Johnston56@yahoo.com','https://robohash.org/kirsten?set=set2','sixOneNine','user','activé'),
('Sabrina_Zieme','Sabrina', 'Zieme', 'Sabrina83@hotmail.com','https://robohash.org/zieme?set=set1','sixOneNine','user','activé'),
('Elizabeth.Stehr','Elizabeth', 'Stehr', 'michel22.durand@gmail.com','https://robohash.org/elizalapache?set=set3','sixOneNine','user','activé'),
('Camille.Breton20','Breton', 'Camille', 'michel133.durand@gmail.com','https://robohash.org/michou?set=set4','sixOneNine','user','activé'),
('Ambre_Morin91','Morin', 'Ambre', 'michel54.durand@gmail.com','https://robohash.org/michou?set=set1','sixOneNine','user','activé'),
('Louna.Roux','Roux', 'Louna', 'michel15.durand@gmail.com','https://robohash.org/guillaume?set=set1','sixOneNine','user','activé'),
('Théo.Marchand18','Marchand', 'Théo', 'michel6.durand@gmail.com','https://robohash.org/guillaume?set=set2','sixOneNine','user','activé'),
('Célia.Marchal15','Marchal', 'Célia', 'michel7.durand@gmail.com','https://robohash.org/guillaume?set=set2','sixOneNine','user','activé'),
('Noa48','Lemoine', 'Noa', 'michel8.durand@gmail.com','https://robohash.org/guillaume?set=set3','sixOneNine','user','activé'),
('Romain_Roussel21','Roussel', 'Romain', 'michel10.durand@gmail.com','https://robohash.org/guillaume?set=set2','sixOneNine','user','activé'),
('Pauline9','Lefevre', 'Pauline', 'michel11.durand@gmail.com','https://robohash.org/robert?set=set3','sixOneNine','user','activé'),
('Camille69','Dufour', 'Camille', 'michel31.durand@gmail.com','https://robohash.org/robert?set=set2','sixOneNine','user','activé'),
('Antoine_Lecomte','Lecomte', 'Antoine', 'michel32.durand@gmail.com','https://robohash.org/robert?set=set4','sixOneNine','user','activé'),
('Léo95','Roy', 'Léo', 'michel33.durand@gmail.com','https://robohash.org/robert?set=set4','sixOneNine','user','activé'),
('Nicolas','Duponde', 'Michelle', 'michel34.durand@gmail.com','https://robohash.org/robert?set=set2','sixOneNine','user','activé'),
('John','Dupond', 'Michel', 'michel35.durand@gmail.com','https://robohash.org/alphonse?set=set2','sixOneNine','user','activé'),
('Clara21','Marie', 'Clara', 'michel36.durand@gmail.com','https://robohash.org/alphonse?set=set1','sixOneNine','user','activé'),
('Yanis.Lemoine','Lemoine', 'Yanis', 'michel37.durand@gmail.com','https://robohash.org/alphonse?set=set1','sixOneNine','user','activé'),
('Baptiste11','Dufour', 'Baptiste', 'michel38.durand@gmail.com','https://robohash.org/alphonse?set=set3','sixOneNine','user','activé'),
('Jade.Louis68','Louis', 'Jade', 'michel39.durand@gmail.com','https://robohash.org/alphonse?set=set4','sixOneNine','user','activé'),
('Pauline_Fernandez','Fernandez', 'Pauline', 'michel322.durand@gmail.com','https://robohash.org/youi?set=set2','sixOneNine','user','activé'),
('Lena_Lefebvre','Lefebvre', 'Lena', 'michel422.durand@gmail.com','https://robohash.org/youi?set=set1','sixOneNine','admin','desactivé');


INSERT INTO "lesson" ("title", "description","level", "teacher_id", "plannified", "status") VALUES
('La physique Chimie pour les Nuls','Une introduction a la physique-chimie','easy',1,null,'finis'),
('La physique Chimie pour les Novices','1er chapitre de physique-chimie','normal',3,null,'commencé'),
('La physique Chimie pour les Pratiquant 2','On commence vraiment physique-chimie','expert',10,null,'plannifié'),
('Le JS pour les Pro','Un cours avancé de physique-chimie','easy',11,null,'plannifié'),
('Les mathematiques analyse complexe','Un cours avancé de mathématique complexe','hard',12,null,'plannifié'),
('Pragmatique du discours','Un cours de Pragmatique','normal',13,null,'plannifié'),
('La physique Chimie pour les novices','Un cours avancé de physique-chimie','easy',14,null,'commencé'),
('La pragmatique pour les Pro','Un cours avancé de Pragmatique','hard',15,null,'plannifié'),
('La gymnastique pour les Pro','Un cours avancé de gymnastique accrobatique','hard',16,null,'commencé'),
('La Bio Chimie pour les Nuls','Une introduction a la physique-chimie','easy',1,null,'finis'),
('La physique cellulaire pour les pros','1er chapitre de physique-cellulaire','normal',9,null,'finis'),
('La physique Chimie pour les experts','On commence vraiment physique-chimie','hard',10,null,'commencé'),
('Le HTML pour les Pro','Un cours avancé de HTML','easy',16,null,'plannifié'),
('Les mathematiques au coeur de notre système sanguin','Un cours débutant de math','easy',17,null,'plannifié'),
('Pragmatique de la parole','Un cours de parole','normal',17,null,'plannifié'),
('La physique Chimie pour les experts en bio-dynamique','Un cours très avancé de physique-chimie','hard',18,null,'commencé'),
('La géographie pour les Pro','Un cours avancé de géographie','hard',18,null,'plannifié'),
('Espagnol pour les Pro','Un cours avancé de langue espagnol','hard',18,null,'commencé'),
('La biométrie pour les petits Enstein','Haut niveau de physique-chimie', 'hard',5,null,'supprimé'),
('La mécanique quantique pour les petits Enstein','Haut niveau de physique', 'hard',5,null,'supprimé');

INSERT INTO "ask" ("title", "description", "author_id","want_it", "level", "status") VALUES
('Par quoi commencer 2?','Quand on debute',1,1,'easy','actif'),
('Jaimerais un cours sur ça ','Un pied devant lautre',2,1,'normal','actif'),
('La numero TROIS TE','Qui sy frotte sy pique',3,1,'hard','actif'),
('PAYER POUR AGIRE AUSSI','Quand on a de la bouteille',4,1,'expert','inactif'),
('PAS POUR LIRE NON','Quand on veux se perfectionner',5,2,'hard','actif');

INSERT INTO "message" ("author_id","lesson_id", "content", "status") VALUES
(1,1,'Bojour','lue'),
(2,2,'Vous allez bien ? ','non-lue'),
(3,3,'Hello','supprimé'),
(4,4,'Salut','modifié'),
(5,5,'ça va ?','lue');


INSERT INTO "category" ("name", "color", "description", "status") VALUES

('Pragmatique', 'red','des cours de Pragmatique',1),
('Histoire', 'orange','des cours d histoire',1),
('JavaScript', 'yellow','des cours de JavaScript',1),
('Mathématiques', 'olive','des cours de mathématiques',1),
('Biologie', 'green','des cours de Biologie',1),
('Analyse Complexe', 'blue','des cours de math',1),
('Algèbre', 'violet','des cours d algèbre',1),
('Bio-chimie', 'purple','des cours de Bio-chimie',1),
('Espagnol', 'pink','des cours en espagnol',1),
('Allemand', 'brown','des cours en Allemand',1),
('Anglais', 'grey','Des cours en Anglais',1),
('Sciences-sociales', 'black','des cours de Poterie',1),
('Economie', 'black','des cours d économie',1),
('Yoga', 'red','des cours de yoga',1),
('Philosophie', 'blue','des cours de Philosophie',1),
('Physique', 'grey','Des cours de physique',1),
('Informatique', 'black','des cours de pc',1),
('Marketing', 'black','des cours de marketing',1),
('Geographie', 'red','des cours de geo',1);

INSERT INTO "lesson_has_category" ("lesson_id", "category_id") VALUES
(1,1),
(2,1),
(3,4),
(4,4),
(5,5);

INSERT INTO "ask_has_category" ("ask_id", "category_id") VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

INSERT INTO "user_subscribe_ask" ("ask_id", "user_id") VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

INSERT INTO "user_subscribe_lesson" ("lesson_id", "user_id") VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

INSERT INTO "user_want_lesson" ("lesson_id", "user_id") VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(4,5),
(5,5);

COMMIT;
