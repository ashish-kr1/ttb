require('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const path = require('path');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
require("./routes/index")(app);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


server.listen(port, function () {
    console.log('server is running on port no ' + port);
});