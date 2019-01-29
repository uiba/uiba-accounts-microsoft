// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by accounts-microsoft.js.
import { name as packageName } from "meteor/uiba:accounts-microsoft";

// Write your tests here!
// Here is an example.
Tinytest.add('accounts-microsoft - example', function (test) {
  test.equal(packageName, "accounts-microsoft");
});
