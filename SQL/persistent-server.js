
/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

var http = require("http");
var url = require('url');
var Sequelize = require('sequelize');

var handlers = require('./request-handler');
var serverHelpers = require('./server-helpers');

var port = 3000;
var ip = "127.0.0.1";

var router = function(req, res) {

  var path = url.parse(req.url).pathname;
  var method = req.method;

  // console.log("%s -- %s", method, path);

  if (path === '/classes/messages') {
    if (method === 'POST') {
      handlers.postMessage(req, res);
    } else if (method === 'GET') {
      handlers.getMessages(req, res);
    } else if (method === 'OPTIONS') {
      handlers.sendOptionsResponse(req, res);
    }
  } else {
    handlers.sendResponse(res, '', 404);
  }
};

var server = http.createServer(router);

// console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);



// var sequelize = new Sequelize("chat", "root", "", {
//     dialect: 'mysql'
//   });
// /* TODO this constructor takes the database name, username, then password.
//  * Modify the arguments if you need to */

// /* first define the data structure by giving property names and datatypes
//  * See http://sequelizejs.com for other datatypes you can use besides STRING. */
// var User = sequelize.define('users', {
//   username: Sequelize.STRING
// });

// var Message = sequelize.define('messages', {
//   username: Sequelize.STRING,
//   message: Sequelize.STRING,
//   roomname: Sequelize.STRING
// });

// // sequelize.authenticate().complete(function(err) {
// //   if (!!err) {
// //     console.log('failed to connect');
// //   } else {
// //     console.log('established connection');
// //   }
// // });

// sequelize.sync().success(function() {});

