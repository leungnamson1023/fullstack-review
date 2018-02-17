const express = require('express');
let app = express();
const github = require('../helpers/github.js');
const db = require('../database/index.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  // let user = [];
  // req.on('error', (err) => {
  //   if (err) {
  //     throw err;
  //   }
  // }).on('data', (chunk) => {
  //   user.push(chunk);
  // }).on('end', () => {
  //   user = Buffer.concat(user).toString();
  //   github.getReposByUsername(user, (err, data) => {
  //  if (err) {
  //     console.log(err, 'err');
  //   } else {
     //  db.save(data, (test) => {
     //    if (test) {
     //      db.find(function(repo) {
     //        res.json(repo);
     //      });
     //    }
     //  });
     // }
//   })
// })
  console.log(req.body);
  github.getReposByUsername(req.body.name, (err, data) => {
    if (err) {
      console.log(err, 'err');
    } else {
      db.save(data, (test) => {
        if (test) {
          db.find(function(repo) {
            res.send(repo);
          })
        }
      })
    }
  })

});

app.get('/repos', function (req, res) {
  db.find(function(repo) {
   res.json(repo);   
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

