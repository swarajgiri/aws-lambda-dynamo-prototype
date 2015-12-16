'use strict';

var aws = require('aws-sdk'),
    cfg = require('./config'),
    dynamodb,
    params;

aws.config.update({
    accessKeyId     : cfg.aws.db.dynamodb.accessKeyId,
    secretAccessKey : cfg.aws.db.dynamodb.secretAccessKey,
    region          : cfg.aws.db.dynamodb.region,
    endpoint        : cfg.aws.db.dynamodb.endpoint
});

dynamodb = new aws.DynamoDB();

params = {
    TableName: 'users',
    KeySchema: [
        {
            AttributeName: 'email',
            KeyType      : 'HASH',
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'email',
            AttributeType: 'S',
        },
        {
            AttributeName: 'id',
            AttributeType: 'N',
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: 'gsiId',
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH',
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            }
        }
    ]
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
       return console.log(err);
    }

    console.log('resp =>', data);
});
