CREATE TABLE todo (
id serial PRIMARY KEY,
todo varchar(255) NOT NULL,
completed BOOLEAN DEFAULT FALSE
);
