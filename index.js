var cfg        = require('./config'),
    aws        = require('aws-sdk'),
    _          = require('lodash'),
    core       = require('./core')(cfg),
    Promise    = require('bluebird'),
    user       = new core.user.User(),
    repo       = core.user.Repo,
    userIds    = [],
    emailIds   = [];

exports.canILambda = function(event, context) {
    loadSampleData()
        .then(function (res) {
            return repo.getById(userIds[_.random(userIds.length - 1)]);
        })
        .then(function (user) {
            console.log(user);
            return repo.getByEmail(emailIds[_.random(emailIds.length - 1)]);
        })
        .then(function (user) {
            console.log(user);
            context.done(null, 'Did i pass?');
        })
        .catch(function (err) {
            console.error('Error => ', err);
            context.done(err);
        });
};

function loadSampleData() {
    var sampleSize = _.random(5, 10),
        saveUsers  = [];

    console.log('Creating users');

    for (var i = sampleSize - 1; i >= 0; i--) {
        user.id    = _.random(_.now());
        user.name  = 'user ' + _.random(_.now());
        user.email = 'email-' + _.random(_.now()) + '@lambdatest.com';

        userIds.push(user.id);
        emailIds.push(user.email);

        saveUsers.push(repo.save(user));
    }

    return Promise.all(saveUsers);
}
