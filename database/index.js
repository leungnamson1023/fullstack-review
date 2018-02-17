const mongoose = require('mongoose');

const options = {
  useMongoClient: true
}

mongoose.connect('mongodb://localhost/fetcher', options, (err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log('db created');
  }
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  repoName: String,
  description: String,
  owner: String,
  htmlUrl: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = function(gitHub) {

  var results = [];
  var gitArray = JSON.parse(gitHub);

  for (var i = 0; i < gitArray.length; i++) {
    var gitObj = {};

    gitObj.id = gitArray[i].id;
    gitObj.repoName = gitArray[i].name;
    gitObj.description = gitArray[i].description;
    gitObj.owner = gitArray[i].owner.login;
    gitObj.htmlUrl = gitArray[i].html_url;

    var repoObj = new Repo(gitObj);

    repoObj.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('success');
      }
    });
  results.push(repoObj);
  }
  console.log('testttttt', results);
}

var find = function(cb) {
  Repo.find((err, repo) => {
    if (err) {
      console.log(err);
    } else {
      console.log('testttt', repo);
      cb(repo);
    }
  }).limit(25).sort({repoName: -1});
}

module.exports.save = save;
module.exports.find = find;