const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);

app.listen(port, function (req, res) {
    console.log("Listening to server...");
});