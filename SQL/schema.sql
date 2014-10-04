DROP DATABASE IF EXISTS chat ;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  username varchar(30),
  message varchar(200),
  roomname varchar(30),
  timestamp timestamp
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  username varchar(30)
);



/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




