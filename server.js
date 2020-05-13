const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello world');
})

app.get('/page2', (req, res) => {
    const str = "두번째 페이지 입니다";
    res.send(str);
})

app.get('/manifest.mpd', (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");   
    res.sendFile(path.join(__dirname, '/manifest.mpd'));

    next();
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

