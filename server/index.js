const express = require('express');
let app = express();
const github = require('../helpers/github.js');
const db = require('../database/index.js');

console.log(db);

app.use(express.static(__dirname + '/../client/dist'));

/*** MIDDLEWARE ***/


app.post('/repos', function (req, res) {
  let user = [];
  req.on('error', (err) => {
    if (err) {
      throw err;
    }
  }).on('data', (chunk) => {
    user.push(chunk);
  }).on('end', () => {
    user = Buffer.concat(user).toString();
    github.getReposByUsername(user, (err, data) => {
   if (err) {
      console.log(err, 'err');
    } else {
      db.save(data);
     }
  })
  res.sendStatus(201);
})

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  db.find(function(repo) {
   console.log(repo);
   res.json(repo);   
  });
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

