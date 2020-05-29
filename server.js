const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();
const port = 3000;

const parser = new xml2js.Parser();

const xml = fs.readFileSync(path.join(__dirname, '/channel/my.xml'), 'utf-8');
let xmlStr = '';

parser.parseString(xml, (err, result) => {
  // console.log('result :', JSON.stringify(result));
  xmlStr = result;
});

app.use(cors());

app.get('/', (req, res, next) => {
  res.send('hello world');

  res.end();
  next();
});

app.get('/page2', (req, res) => {
  const str = '두번째 페이지 입니다';
  res.send(str);

  res.end();
  next();
});

app.get('/manifest.mpd', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/manifest.mpd'));

  res.end();
  next();
});

app.get('/channel', (req, res, next) => {
  res.send(xmlStr);

  res.json(JSON.parse(xmlStr));

  res.end();
  next();
});

app.get('/Fire', (req, res, next) => {
  console.log(req.headers);
  // res.download('./Fire/Firework_HD.mpd', (err) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   } else {
  //     console.log('do somthing');
  //   }
  // });

  res.sendFile(path.join(__dirname, 'test.txt'), (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('do something');
    }
  });

  res.end();
	next();
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
