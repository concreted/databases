var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "aric",
  password: "hackreactor",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
  dbConnection.query("select * from messages", cb);
};

exports.findUser = function(username, cb){
  dbConnection.query("select username from users where username = '" + username + "'", cb);
};

exports.saveUser = function(username, cb){
  console.log('saving user:', username );
  var query = "insert into users (username) values ('" + username + "')";
  console.log(query);
  dbConnection.query(query, function(err, rows) {
    console.log('Insert result:', err);
    console.log(rows);
  });
  cb();
};

exports.saveMessage = function(message, userid, roomname, cb){
  dbConnection.query("insert into messages (message, roomname, username) values ('" + message + "', '" + roomname + "', '" + userid + "')", cb);
};
