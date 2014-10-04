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
  var resultsCallback = function (results) {
    var chat = {
      message: message.message,
      userid: results[0].id,
      roomname: message.roomname
    };

    saveMessage(chat.userid, chat.message, chat.roomname, function () {
      serverHelpers.sendResponse(res, message);
    });
  };

  parseData(req, function(_, msg) {
    message = msg;
    findOrCreateUser(msg.username, function(results) {
      resultsCallback(results);
    });

  });
};

exports.getMessages = function(req, res) {
  findMessages(function(messages) {
    serverHelpers.sendResponse(res, messages);
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
