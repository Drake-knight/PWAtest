const express = require('express');
const controller = require('./controller/herocontroller');
const cors = require('cors');
const PORT = 5000;

var app = express();
app.use(cors());

controller(app);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});