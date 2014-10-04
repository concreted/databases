var db = require('./db');
var serverHelpers = require('./server-helpers');
// wham! magic.
var parseData = serverHelpers.collectData;
var saveMessage = db.saveMessage;
var saveUser = db.saveUser;
var findMessages = db.findAllMessages;
var findUser = db.findUser;
var findOrCreateUser = db.findOrCreateUser;

exports.postMessage = function(req, res) {
  // declare this variable so we can retain access to it throughout the entire promise chain.
  var message;
  //console.log('MESSAGE: ' + message);
  var resultsCallback = function (results) {
    console.log('========================================results: ' + results[0].id)
    var chat = {
      message: message.message,
      userid: results[0].id,
      username: message.username,
      roomname: message.roomname
    };

    saveMessage(chat.userid, chat.message, chat.username, chat.roomname, function () {
      serverHelpers.sendResponse(res, message);
    });
  };

  parseData(req, function(_, msg) {
    message = msg;
    //console.log('MESSAGE: ' + JSON.stringify(message));

    findOrCreateUser(msg.username, function(results) {
      resultsCallback(results);
    });

  });
};

exports.getMessages = function(req, res) {
  findMessages(function(messages) {
      //console.log("FOUND MESSAGES", messages);
      serverHelpers.sendResponse(res, messages);
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
