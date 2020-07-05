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

app.get('/', (req,res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('hello world');

  next();
});

app.get('/channel', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.send(xmlStr);

  res.json(xmlStr);

  res.end();
  next();
});

app.get('/Fire', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const file = path.resolve(__dirname, 'Fire/Firework_HD.mpd');

  res.download(file, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('do something');
    }
  });
});

app.get('/Fire/:name', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  
  const fileName = path.resolve(__dirname, 'Fire/', req.params.name);
  console.log('fileName', fileName)
  res.sendFile(fileName,  (err) => {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
  
});

app.get('/icon', (req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const image = path.resolve(__dirname, 'icons/icon.png');

  res.sendFile(image, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('success icon image');
    }
  })
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
