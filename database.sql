--SQL commands used for DB creation

--Create database
CREATE DATABASE task-list;

--Create a table in database
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  tasks varchar(100) NOT NULL,
  completed BOOLEAN NOT NULL
);
