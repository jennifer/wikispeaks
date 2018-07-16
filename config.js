'use strict';

var AWS = require('aws-sdk');

exports.PORT = process.env.PORT || 8080;

AWS.config.accessKeyId = process.env.MY_KEY;
AWS.config.secretAccessKey = process.env.SECRET_KEY;
AWS.config.region = 'us-west-2';

//exports.MY_KEY = process.env.MY_KEY;
//exports.SECRET_KEY = process.env.SECRET_KEY;