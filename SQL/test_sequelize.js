var mysql = require('mysql');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "", {
    dialect: 'mysql'
  });

var tools = require('./db');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('users', {
  username: Sequelize.STRING
});

var Message = sequelize.define('messages', {
  message: Sequelize.STRING,
  roomname: Sequelize.STRING,
  userid: Sequelize.INTEGER
});

sequelize.sync().success(function() {
  console.log('test saving message');
  Message.create({
    message: 'Test Message',
    roomname: 'Test Room',
    userid: 100
  }).success(function(message) {
    console.log(message.values);
    Message.findAll().success(function(results) {
      console.log(results);
    });
  });
});


