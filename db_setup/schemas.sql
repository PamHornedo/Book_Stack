-- Create database
CREATE DATABASE bookstack;

-- Connect to the database
\c bookstack;

-- DROP TABLE IF EXISTS votes CASCADE;
-- DROP TABLE IF EXISTS answers CASCADE;
-- DROP TABLE IF EXISTS questions CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TYPE IF EXISTS vote_type;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CREATE TABLE questions (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(200) NOT NULL,
--     body TEXT NOT NULL,
--     user_id INTEGER NOT NULL,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     CONSTRAINT fk_questions_user
--         FOREIGN KEY (user_id)
--         REFERENCES users (id)
--         ON DELETE CASCADE
-- );

-- CREATE TABLE answers (
--     id SERIAL PRIMARY KEY,
--     body TEXT NOT NULL,
--     question_id INTEGER NOT NULL,
--     user_id INTEGER NOT NULL,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     CONSTRAINT fk_answers_question
--         FOREIGN KEY (question_id)
--         REFERENCES questions (id)
--         ON DELETE CASCADE,
--     CONSTRAINT fk_answers_user
--         FOREIGN KEY (user_id)
--         REFERENCES users (id)
--         ON DELETE CASCADE
-- );

-- CREATE TYPE vote_type AS ENUM ('up', 'down');

-- CREATE TABLE votes (
--     id SERIAL PRIMARY KEY,
--     type vote_type NOT NULL,
--     answer_id INTEGER NOT NULL,
--     user_id INTEGER NOT NULL,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     CONSTRAINT fk_votes_answer
--         FOREIGN KEY (answer_id)
--         REFERENCES answers (id)
--         ON DELETE CASCADE,
--     CONSTRAINT fk_votes_user
--         FOREIGN KEY (user_id)
--         REFERENCES users (id)
--         ON DELETE CASCADE,
--     CONSTRAINT uq_votes_answer_user UNIQUE (answer_id, user_id)
-- );