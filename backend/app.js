const express = require('express');
const controller = require('./controller/herocontroller');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

var app = express();
app.use(cors());

controller(app);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});