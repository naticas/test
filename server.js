const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res, next) => {
  res.send('hello world');

  next();
});

app.get('/page2', (req, res) => {
  const str = '두번째 페이지 입니다';
  res.send(str);

  next();
});

app.get('/manifest.mpd', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/manifest.mpd'));

  next();
});

app.get('/channel', (req, res, next) => {
  console.log('test channel uri');
  fs.readFile(__dirname + '/channle/my.xml', (err, data) => {
    console.log('data');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.write(data);
    res.end();
  });

  //   const parser = new xml2js.Parser();

  //   fs.readFile(__dirname + 'channle/my.xml', (err, data) => {
  //     parser.parseString(data, (err, result) => {
  //       console.dir(result);
  //       console.log('done!!');
  //     });
  //   });

  next();
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
