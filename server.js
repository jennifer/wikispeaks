"use strict";

const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const parser = express.json();

require('./awsauth.js');

const { PORT } = require('./config');

app.use(express.static('public'));

app.post('/', parser, (req, res) => {
  console.log('Body = ' + req.body.text);
  const polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-west-2'
  })
  const params = {
    OutputFormat: 'mp3', 
    Text: req.body.text,
    VoiceId: 'Kimberly'
  };
  polly.synthesizeSpeech(params, function(err, data) {
    if (err){
      console.log(err, err.stack);
      res.status(400).send('Request failed');
    } 
    else {
      let buffer = Buffer.from( new Uint8Array(data.AudioStream) );
      res.writeHead(200, {
        "Content-Type": "audio/mp3"
      });
      res.write(buffer);
      res.end();
      console.log('sending response...');
    }
  });
});

app.listen(PORT, () => console.log('Listening on PORT 8080'));

/*
let uInt8Array = new Uint8Array(data.AudioStream);
let arrayBuffer = uInt8Array.buffer;
let blob = new Blob([arrayBuffer]);
*/