--SQL commands used for DB creation

--Create database
CREATE DATABASE task-list;

--Create a table in database
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  todo varchar(100),
  completed BOOLEAN
);
