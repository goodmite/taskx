var Git = require("nodegit");

// Open the repository directory.
Git.Repository.open("tmp")
    // Open the master branch.
    .then(function(repo) {
        return repo.getMasterCommit();
    })
