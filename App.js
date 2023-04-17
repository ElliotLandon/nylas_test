const express = require("express");

const hostname = '127.0.0.1';
const port = 3001;

const app = express();

const Nylas = require('nylas');
const fs = require('fs');

Nylas.config({
clientId: 'CLIENT_ID',
clientSecret: 'CLIENT_SECRET',
});

const nylas = Nylas.with('ACCESS_TOKEN');

fs.readFile('./test.png', (err, data) => {
  f = nylas.files.build({
      filename: 'test.png',
      data: data,
      contentType: 'PNG image',
  });

  f.upload((err, file) => {
    // Create a draft and attach the file to it.
    const draft = nylas.drafts.build({
      subject: 'New Attachment',
      to: [{ email: 'austin.nylas.test@gmail.com' }],
      body: 'Hey, find the file attached.',
    });

    draft.files = [file];

    draft.send().then(message => {
      console.log(`${message.id} was sent`);
    });
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});