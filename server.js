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

app.get('/', (req, res) => {
  const file = path.resolve(__dirname, 'Fire/Firework_HD.mpd');
  // const stat = fs.statSync(file);
  // const total = stat.size;

  // if (req.headers.range) {
  //   console.log(req.headers.range);
  // }

  // fs.exists(file, (exists) => {
  //   if (exists) {

  //   }
  // })

  // res.sendFile(file, (err) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log('do something');
  //   }
  // })

  res.download(file, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('do something');
    }
  });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
