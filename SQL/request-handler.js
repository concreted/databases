var db = require('./db');
var serverHelpers = require('./server-helpers');
// wham! magic.
var parseData = serverHelpers.collectData;
var saveMessage = db.saveMessage;
var saveUser = db.saveUser;
var findMessages = db.findAllMessages;
var findUser = db.findUser;




exports.postMessage = function(req, res) {
  // declare this variable so we can retain access to it throughout the entire promise chain.
  var message;
  console.log('MESSAGE: ' + message);
  var resultsCallback = function (results) {
    //console.log('results: ' + results)
    var chat = {
      message: message.message,
      //userid: results[0].id,
      username: message.username,
      roomname: message.roomname
    };

    saveMessage(chat.message, chat.username, chat.roomname, function () {
      serverHelpers.sendResponse(res, message);
    });
  };

  parseData(req, function(_, msg) {
    message = msg;
    console.log('MESSAGE: ' + JSON.stringify(message));
    findUser(msg.username, function (err, results) {
      console.log("RESULTS:", results)
      // no results/0 results
      // console.log('checked for user');
      if (!results || !results.length) {
        // create the user, then post the message
        // console.log('no user found');
        // console.log('username: ', message.username)
        saveUser(message.username, function() {
          findUser(msg.username, function(results) {
            console.log('RESULTS AFTER SAVE:', results);
            resultsCallback(results);
          });
        });
      } else {
        console.log('user found');
        // user exists, post the message to this user
        resultsCallback(results);
      }
    });
  });
};

exports.getMessages = function(req, res) {
  findMessages(function(messages) {
      console.log("FOUND MESSAGES", messages);
      serverHelpers.sendResponse(res, messages);
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
