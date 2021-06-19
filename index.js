const express = require('express');
const routes = require('./routes/routes');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(routes);
const DEFAULT_PORT = process.env.PORT || 3000;

app.listen(DEFAULT_PORT);
