'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

// Challenge: Understand BCrypt Hashes
// Instructions: Add BCrypt as a dependency in your project and require it as 'bcrypt' in your server.
const bcrypt = require('bcrypt');

//START_ASYNC -do not remove notes, place code between correct pair of notes.
// Challenge: Hash and Compare Passwords Asynchronously
// Instructions-1: Add the supplied hashing function to your server and log it to the console for you to see!
// Instructions-2: Add the supplied hashing function into your existing hash function(since you need to wait for the hash to complete before calling the compare function) after you log the completed hash and log 'res' to the console within the compare.
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  console.log(hash);
  // $2b$12$ayqpnp8vDCeZPPnP.uy6XuYELMrK6O7hiuti858zIlRKZ6n9dGvqO
  bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
    console.log(res);
    // true
  });
});
//END_ASYNC

//START_SYNC
// Challenge: Hash and Compare Passwords Synchronously
// Instructions: Add the functions in and log the result to the console to see it working.
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash)
var result = bcrypt.compareSync(myPlaintextPassword, hash);
console.log(result)
//END_SYNC






























app.listen(process.env.PORT || 3000, () => {});
