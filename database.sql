--create table:
CREATE TABLE todo (
id serial PRIMARY KEY,
todo varchar(255),
completed BOOLEAN
);

--query all entries from table that will order incompleted tasks first:
SELECT * FROM todo ORDER BY completed ASC;

--post:
INSERT INTO todo (todo, completed)
VALUES ($1, $2)
[item.todoItem, item.completed];

--change from incomplete to complete:
UPDATE todo
SET completed = NOT completed
WHERE id = $1
[id];

--delete:
DELETE FROM todo
WHERE id = $1
[id];
