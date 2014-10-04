var mysql = require('mysql');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "", {
    dialect: 'mysql'
  });
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('users', {
  username: Sequelize.STRING
});

var Message = sequelize.define('messages', {
  username: Sequelize.STRING,
  userid: Sequelize.INTEGER,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING,
});

sequelize.sync().success(function() {});


exports.findAllMessages = function(cb){
  Message.findAll({attributes: ['username', 'message', 'roomname']}).success(cb);
};

exports.findUser = function(username, cb){
  User.find({where: {username: username}, attributes: ['username']}).success(cb);
};

exports.findOrCreateUser = function(username, cb) {
  User.findOrCreate({where: {username: username}}).success(cb);
};

exports.saveUser = function(username, cb){
  User.create({
    username: username
  }).success(cb);
};

exports.saveMessage = function(userid, message, username, roomname, cb){
  Message.create({
    userid: userid,
    username: username,
    message: message,
    roomname: roomname
  }).success(cb);
};
