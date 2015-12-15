module.exports = function (cfg, db) {
    var Promise = require('bluebird'),
        _       = require('lodash'),
        table   = 'users' ;

    function User() {
        this.id    = null;
        this.name  = null;
        this.email = null;
    }

    function Repo() {}

    Repo.save = function (user) {
        return new Promise(function (resolve, reject) {
            db.dynamodb.put({'TableName': table, 'Item': user}, function (err, data) {
                if (err) {
                    return reject(err);
                }

                console.log('saved user ', user.id);

                resolve(data);
            });
        });
    };

    Repo.getById = function (id) {
        var params = {
            TableName                : table,
            FilterExpression         : '#id = :id',
            ExpressionAttributeNames : {
                '#id': 'id'
            },
            ExpressionAttributeValues : {
                ':id'  : id
            }
        };

        return new Promise(function (resolve, reject) {
            db.dynamodb.scan(params, function (err, data) {
                if (err) {
                    return reject(err);
                }

                if (! data.Items.length) {
                    return resolve(null);
                }

                console.log('getById ', id);

                resolve(_.create(new User(), _.first(data.Items)));
            });
        });
    };

    Repo.getByEmail = function (email) {
        return new Promise(function (resolve, reject) {
            var params = {
                'TableName'              : table,
                KeyConditionExpression   : '#key = :keyval',
                ExpressionAttributeNames : {
                    '#key': 'email'
                },
                ExpressionAttributeValues : {
                    ':keyval': email
                }
            };

            db.dynamodb.query(params, function (err, data) {
                if (err) {
                    return reject(err);
                }

                if (! data.Items.length) {
                    return resolve(null);
                }

                console.log('getByEmail ', email);

                resolve(_.create(new User(), _.first(data.Items)));
            });

        });
    };

    return {
        'User': User,
        'Repo': Repo
    };
};
