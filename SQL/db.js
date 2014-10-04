var mysql = require('mysql');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "aric", "hackreactor", {
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
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
});

sequelize.authenticate().complete(function(err) {
  if (!!err) {
    console.log('failed to connect');
  } else {
    console.log('established connection');
  }
});

sequelize.sync().success(function() {});


// var dbConnection = mysql.createConnection({
//   user: "aric",
//   password: "hackreactor",
//   database: "chat"
// });

// dbConnection.connect();


exports.findAllMessages = function(cb){
  Message.find().success(cb);
  //Message.find({where: {username: 'Valjean'}, attributes: ['username', 'message', 'roomname', 'id', 'timestamp']}).success(cb);
  //dbConnection.query("select * from messages", cb);
};

exports.findUser = function(username, cb){
  User.find({where: {username: username}, attributes: ['username']}).success(cb);
  //dbConnection.query("select username from users where username = '" + username + "'", cb);
};

exports.saveUser = function(username, cb){
  // // console.log('saving user:', username );
  // var query = "insert into users (username) values ('" + username + "')";
  // // console.log(query);
  // dbConnection.query(query, function(err, rows) {
  //   // console.log('Insert result:', err);
  //   // console.log(rows);
  // });
  // cb();
};

exports.saveMessage = function(message, userid, roomname, cb){
  //dbConnection.query("insert into messages (message, roomname, username) values ('" + message + "', '" + roomname + "', '" + userid + "')", cb);
};
