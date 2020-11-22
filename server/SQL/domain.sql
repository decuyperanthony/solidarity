CREATE DOMAIN DIFFICULTY AS TEXT
CHECK(
   VALUE 'easy', 'normal', 'hard', 'expert'
);