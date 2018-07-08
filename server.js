"use strict";

const AWS = require('aws-sdk');
const express = require('express');
const app = express();

require('./awsauth.js');

const { PORT } = require('./config');

app.use(express.static('public'));

app.post('/', (req, res) => {
  console.log('Body = ' + req.body);
  const polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-west-2'
  })
  const params = {
    OutputFormat: 'mp3', 
    Text: req.body,
    VoiceId: 'Kimberly'
  };
  polly.synthesizeSpeech(params, function(err, data) {
    if (err){
      console.log(err, err.stack);
      res.status(400).send('Request failed');
    } 
    else {
      console.log('sending response...')
      let uInt8Array = new Uint8Array(data.AudioStream);
      let arrayBuffer = uInt8Array.buffer;
      let blob = new Blob([arrayBuffer]);
      res.status(200).send(blob);
    }
  });
});

app.listen(PORT, () => console.log('Listening on PORT 8080'));