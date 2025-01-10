-- seeding_tables.sql --

-- BEGIN is used to start a new transaction --
BEGIN;

INSERT INTO "admin" ("userName", "email", "password", "role")
VALUES
  ('Louis', 'louis-antonin-lesieur@admin.fr', '$2b$10$Nje6cod/pMLKf4GzZFCpP.zCLEy0n7YEVtzPpHqA8NkYnO6qq180K', 'admin'),
  ('Marc', 'marc-barbieri@admin.fr', '$2b$10$P6j0yizxIosxtDOTq8ds8.vycFwcfANUuPBNwLxd55LwZI0jK8fXq', 'admin'),
  ('Adrien', 'adrien-rimbault@admin.fr', '$2b$10$yAevriL.Qtrdtbp3lrd2YulNV09iXn/OwsiSUjlC0vXb8GLSKyESG', 'admin'),
  ('Stevens', 'stevens-lapasse@admin.fr', '$2b$10$M.Klu1HHmpW6MBzLOCoxG.foAkZxDYurb2OoEtxdLahAEqopTIZAi', 'admin'),
  ('Alexandre', 'alexandre-sampaio@admin.fr', '$2b$10$h2mcBpBAoCCbyVxmwda9te178P0BvkppZOdVy2Lq0aGFJKxqXu8XG', 'admin')
  ;

-- Below blocks are to seed tables in database with random data --
INSERT INTO "users" ("userName", "gender", "picture", "role", "email", "password", "age", "hometown", "bio")
VALUES
  ('Aline', 'F', 'http://localhost:3000/uploads/aline.webp', 'member', 'aline@example.com', 'password', 67, 'Paris', 'Bonjour, je suis Aline. J''adore les balades en forêt et les week-ends musicaux !'),
  ('Bernard', 'M', 'http://localhost:3000/uploads/bernard.webp', 'member', 'bernard@example.com', 'password', 61, 'Monaco', 'Enchanté, Bernard, 61 ans, je serais ravi de vous rencontrer afin d''échanger quelques mots !'),
  ('Alain', 'M', 'http://localhost:3000/uploads/alain.webp', 'member', 'alain@example.com', 'password', 71, 'Villeneuve', 'J''ai une belle moustache mais pas que !... J''ai aussi un grand coeur !'),
  ('Michel', 'M', 'http://localhost:3000/uploads/michel.webp', 'member', 'michel@example.com', 'password', 68, 'Bordeaux', 'Coucou, je suis Michel et je suis un grand fan de la musique !'),
  ('Jim', 'M', 'http://localhost:3000/uploads/jim.webp', 'member', 'jim@example.com', 'password', 60, 'Metz', 'Bienvenu sur mon profil, je suis ophtalmo, mais avant tout je suis Jim ! Vu mon prénom, vous vous doutez que j''aime les ballades !'),
  ('Josiane', 'F', 'http://localhost:3000/uploads/josiane.webp', 'member', 'josiane@example.com', 'password', 69, 'Saint-Tropez', 'Très peu de choses à dire sur moi, je suis Josiane et j''aime les sorties en mer.'),
  ('Grace', 'F', 'http://localhost:3000/uploads/grace.webp', 'member', 'grace@example.com', 'password', 55, 'Lille', 'Bonjour à toutes et à tous, Grace, jeune retraitée, je suis à la recherche de nouvelles rencontres. A bientôt peut-être...!'),
  ('Claude', 'M', 'http://localhost:3000/uploads/claude.webp', 'member', 'claude@example.com', 'password', 75, 'Pau', 'Claude, 75 ans, je suis un grand fan de jardinage et de musique classique.'),
  ('Jacques', 'M', 'http://localhost:3000/uploads/jacques.webp', 'member', 'jacques@example.com', 'password', 70, 'Dijon', 'Je suis Jacques, 70 ans, je collectionne les timbres depuis plus de 50 ans, ainsi que les pots de moutarde.'),
  ('Roland', 'M', 'http://localhost:3000/uploads/roland.webp', 'member', 'roland@example.com', 'password', 70, 'Caen', 'Hâte de vous rencontrer, je suis Roland, 70 ans, et je suis un grand fan de la musique classique. J''aime aussi les sorties en mer.'),
  ('Marc', 'M', 'http://localhost:3000/uploads/marc.webp', 'member', 'marc@gmail.com', '$2b$10$UNldzbsbsiAsFSSTI6QDqO2FWm6OY3HBaYvRGZqMyboiuDRDpkuLu', 37, 'Avignon', 'Bonjour, je suis Marc and I love Burgers much more than les paillettes !'),
  ('Hélène', 'F', 'http://localhost:3000/uploads/helene.webp', 'member', 'helene@example.com', 'password', 65, 'Marseille', 'Bonjour, je suis Hélène, 65 ans, j''aime les jeux de société et préparer des repas.'),
  ('Danielle', 'F', 'http://localhost:3000/uploads/danielle.webp', 'member', 'danielle@example.com', 'password', 79, 'Nantes', 'Grande fanatique des chapeaux, je cherche une nouvelle amitié !'),
  ('Caroline', 'F', 'http://localhost:3000/uploads/caroline.webp', 'member', 'caroline@example.com', 'password', 64, 'Lorient', 'Salut, Caro, anciennement professeur de Yoga, j''organise aujourd''hui des cours de Yoga pour les seniors.')
  ;

INSERT INTO "event" ("title", "picture", "description", "date", "location", "creator_id")
VALUES 
  ('Ballade en forêt', 'http://localhost:3000/uploads/ballade.webp', 'Nous vous proposons une ballade en forêt en compagnie de nos amis !', '2/02/2025', 'Marseille', 2),
  ('Week-end musical', 'http://localhost:3000/uploads/guitares.webp', 'Partageons ensemble pour un week-end musical !', '29/11/2024', 'Paris', 1 ),
  ('Atelier dessin', 'http://localhost:3000/uploads/workshop.webp', 'Venez titiller le crayon et le feutre dans un moment convivial.', '17/01/2025', 'Paris', 8),
  ('Soirée piscine chez Marc', 'http://localhost:3000/uploads/piscine.webp', 'Venez gagner une médaille aux JO avec le M', '29/10/2024', 'Avignon', 11),
  ('Atelier de jardinage', 'http://localhost:3000/uploads/jardinage.webp', 'Rencontrons-nous autour d''un pot (de fleurs bien sûr) pour faire connaissance.', '29/10/2024', 'Paris', 8),
  ('Soirée burgers', 'http://localhost:3000/uploads/jones.webp', 'Vous connaissez mon amour pour les burgers, je vous propose qu''on fasse connaissance ensemble autour d''un cour de cuisinie sauce Texas', '7/12/2024', 'Avignon', 11),
  ('Weekend en bord de mer et déjeuner', 'http://localhost:3000/uploads/plage.webp', 'Rendez-vous est donné à l''hôtel de ville, puis restaurant en groupe avec une vue magnifique sur la mer à Ouistreham.', '7/12/2024', 'Caen', 10)
  ;

INSERT INTO "tag" ("name", "color")
VALUES
  ( 'Danse', 'b92bcc'),
  ( 'Musique', 'bb5544'),
  ( 'Santé', '7766ee'),
  ( 'Bien-être', '3399ff'),
  ( 'Rencontre', 'ffbb33'),
  ( 'Jeux', 'ff4422'),
  ( 'Sortie', '77ddff'),
  ( 'Jardinage', '77cc55'),
  ( 'Sport', 'aa5599')
  ;

INSERT INTO "message" ("sender_id", "receiver_id", "content")
VALUES
  (11, 1, 'Bonjour Aline, venez gagner une médaille aux JO en rejoignant mon évènement s''il vous plait !'),
  (1, 11, 'Bonjour Marc, je ne sais pas si je peux venir, je fais des burgers ce soir.'),
  (11, 1, 'Ah mais c''est super parce que je suis un grand fan de burgers !'),
  (1, 11, 'OK'),
  (11, 1, 'Je peux en avoir un ?'),
  (1, 11, 'Non'),
  (1, 11, 'Dommage !'),
  (11, 1, 'Je me languissais pourtant...'),
  (1, 11, 'Je suis désolé, je ne peux pas vous en donner un, je les ai tous mangés !'),
  (11, 1, 'Pas de soucis, je comprends !'),
  (11, 2, 'Bonjour Bernard, je suis Marc, je suis un grand fan de la musique classique.'),
  (2, 11, 'Bonjour Marc, je suis un grand fan de la musique classique également.'),
  (11, 2, 'OK'),
  (2, 11, 'OK'),
  (11, 2, 'Je suis aussi un grand fan de la musique classique.'),
  (2, 11, 'OK'),
  (11, 2, 'Rien de plus ? Non parce que je suis aussi un grand fan de la musique classique.'),
  (11, 3, 'Bonjour Alain, venez gagner une médaille aux JO en rejoignant mon évènement s''il vous plait !'),
  (3, 11, 'Bonjour Marc, je ne sais pas si je peux venir, je fais des burgers avec Aline ce soir.'),
  (11, 3, 'Ah mais c''est super parce que je suis un grand fan de burgers !'),
  (3, 11, 'Aline m''a dit ça oui.'),
  (11, 3, 'Je peux en avoir un ?'),
  (3, 11, 'Non, toujours pas.'),
  (3, 11, 'Dommage !'),
  (11, 3, 'Je me languissais pourtant...'),
  (3, 11, 'Je suis désolé, je ne peux pas vous en donner un, je les ai tous mangés !'),
  (11, 3, 'Pas de soucis, je comprends !')
  ;

INSERT INTO "user_has_tag" ("user_id", "tag_id")
VALUES
  (1, 3),
  (1, 7),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 7),
  (4, 8),
  (4, 9),
  (5, 1),
  (5, 2),
  (6, 3),
  (6, 4),
  (7, 5),
  (7, 6),
  (8, 7),
  (8, 8),
  (8, 9),
  (9, 1),
  (9, 2),
  (10, 3),
  (10, 4),
  (11, 5),
  (11, 6),
  (12, 7),
  (12, 8),
  (12, 9),
  (13, 1),
  (13, 2),
  (14, 3),
  (14, 4)
  ;

INSERT INTO "event_has_tag" ("event_id", "tag_id")
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 1),
  (2, 2),
  (3, 5),
  (3, 6),
  (4, 2),
  (4, 4),
  (4, 9),
  (5, 1),
  (6, 3),
  (6, 4),
  (7, 5),
  (7, 6)
  ;

INSERT INTO "event_participants" ("user_id", "event_id")
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (2, 2),
  (3, 2),
  (4, 2),
  (5, 3),
  (6, 3),
  (7, 3),
  (8, 4),
  (9, 4),
  (10, 4),
  (11, 5),
  (12, 5),
  (13, 5),
  (14, 6),
  (3, 3),
  (4, 4),
  (5, 5),
  (6, 6),
  (7, 7),
  (8, 1),
  (9, 2),
  (10, 3),
  (11, 4),
  (12, 5),
  (13, 6),
  (14, 7)
  ;

INSERT INTO "testimonies" ("title", "content", "user_id")
VALUES
  ('Quelle soirée !', 'J''ai franchement beaucoup aimé rencontrer de nouveaux amis lors de ma soirée burgers. Merci Senior Love de vous avoir permis de partager ce moment inoubliable !', 11),
  ('De belles rencontres...', 'Quel moment merveilleux ! Grand moment de partage lors de notre ballade en forêt. Merci Senior Love ! Je recommande votre site auprès de mes amis. À celles et ceux qui hésitent... N''hesitez plus ! Senior Love, c''est pour de vrai ! ', 2),
  ('Un moment inoubliable !', 'Je me suis beaucoup amusé en compagnie de mes amis lors de notre week-end musical. Plutôt sceptique au début, je suis maintenant convaincu de la qualité de ce site. Pouvoir trouver des évènements en fonction de nos centres d''intérêt est vraiment pratique. Merci beaucoup !', 1)
  ;

-- COMMIT is to end the transaction --
COMMIT;