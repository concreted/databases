/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      // TODO: Fill this out with your mysql username
      user: "root",
      // and password.
      password: "",
      database: "chat"
    });
    dbConnection.connect();

    var tablename = "users"; // TODO: fill this out


    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    //dbConnection.query("truncate " + tablename, done);
    dbConnection.query("truncate " + 'messages', done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    request({method: "POST",
             uri: "http://127.0.0.1:3000/classes/messages",
             json: {username: "Valjean",
                    message: "In mercys name, three days is all I need.",
                    roomname: "Hello"}
            },
            function () {
              /* Now if we look in the database, we should find the
               * posted message there. */

              var queryString = "select username, message from messages";
              var queryArgs = [];
              /* TODO: Change the above queryString & queryArgs to match your schema design
               * The exact query string and query args to use
               * here depend on the schema you design, so I'll leave
               * them up to you. */
              dbConnection.query( queryString, queryArgs,
                function(err, results) {
                  // Should have one result:
                  expect(results.length).to.equal(1);
                  expect(results[0].message).to.equal("In mercys name, three days is all I need.");
                  /* TODO: You will need to change these tests if the
                   * column names in your schema are different from
                   * mine! */

                  done();
                });
            });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var now = new Date();
    var jsonDate = now.toJSON();
    var then = new Date(jsonDate);

    var queryString = "insert into messages (username, message, roomname, createdAt, updatedAt) values ('Valjean', 'Men like you can never change!', 'main', NOW(), NOW())";
    console.log(queryString);
    var queryArgs = [];
    /* TODO - The exact query string and query args to use
     * here depend on the schema you design, so I'll leave
     * them up to you. */

    dbConnection.query( queryString, queryArgs,
      function(err) {
        if (err) { throw err; }
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        request("http://127.0.0.1:3000/classes/messages",
          function(error, response, body) {
            console.log('whats happening')
            console.log('(' + body.toString() + ')BODY BODY BODY BODY BODY BODY');
            var messageLog = JSON.parse(body);

            expect(messageLog[0].message).to.equal("Men like you can never change!");
            expect(messageLog[0].roomname).to.equal("main");
            done();
          });
      });
  });
});
