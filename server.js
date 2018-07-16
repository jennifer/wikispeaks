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
      let jsonBuffer = JSON.stringify(buffer);
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(jsonBuffer);
      res.end();
      console.log('sending response...');
    }
  });
});

//app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

app.listen(process.env.PORT || 8080, function(){
  console.log(`Your app is listening on port ${PORT}`);
});