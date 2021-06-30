const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const searchHistory = require('./routes/searchHistory');
// const celebritiesRouter = require('./routes/celebrities');
// const roomsRouter = require('./routes/rooms');



app.use('/searchhistory', searchHistory);
// app.use('/celebrities', celebritiesRouter);
// app.use('/rooms', roomsRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../spotify-player/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'SpotOn', 'spotify-player', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});