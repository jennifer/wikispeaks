"use strict";

const AWS = require('aws-sdk');
const Fs = require('fs');
const express = require('express');
const uuid = require('node-uuid');
const app = express();

require('dotenv').config();
const { PORT, aws_access_key_id, aws_secret_access_key } = require('./config');

app.use(express.static('public'));
app.listen(PORT, () => console.log('Listening on PORT'));



/*
// Load the SDK and UUID


// Create an S3 client
//const s3 = new AWS.S3();

// Create a bucket and upload something into it
const bucketName = 'wikispeaks-node' + uuid.v4();
const keyName = 'hello_world.txt';

s3.createBucket({Bucket: bucketName}, function() {
  const params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
  s3.putObject(params, function(err, data) {
    if (err)
      console.log(err)
    else
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  });
});
*/