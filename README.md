## AWS lambda
Lambda function to insert and query a set of fake `users`.

### Dependencies
- Nodejs. Best way to install nodejs is [nvm](https://github.com/creationix/nvm)
- Grunt.  `npm install -g grunt`

Installation
```
npm i
```

### Testing
To test the lambda function,
1. Add dynamodb credentials in `config.js`
2. Create required tables `grunt setup`
3. Test the function `grunt test`

### Contributing
- On adding a npm module, run `npm shrinkwrap`.
- The project follows [semantic versioning 2.0.0](http://semver.org/)

