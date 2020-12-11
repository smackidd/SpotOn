const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createServer = require('./createServer');

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.post('/users', createServer.pushUser)
app.get('/users', createServer.fetchUser)

app.post('/searchhistory', createServer.pushSearchHistory)
app.get('/searchhistory', createServer.fetchSearchHistory)

app.listen(5005);