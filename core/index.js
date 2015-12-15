'use strict';

var _       = require('lodash'),
    modules = [
        'user',
    ];

function init(cfg) {
    var core  = {},
        aws   = require('aws-sdk'),
        db    = {};

    aws.config.update({
        accessKeyId    : cfg.aws.db.dynamodb.accessKeyId,
        secretAccessKey: cfg.aws.db.dynamodb.secretAccessKey,
        region         : cfg.aws.db.dynamodb.region,
        endpoint       : cfg.aws.db.dynamodb.endpoint
    });

    db.dynamodb = new aws.DynamoDB.DocumentClient();

    _.each(modules, function(module) {
        core[module] = require('./' + module)(cfg, db);
    });

    return core;
}

module.exports = init;
