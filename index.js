const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const app = express();
const DEFAULT_PORT = process.env.PORT || 3000;

require('dotenv').config({
    path: './config/.env'
});

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*")
    app.use(cors());
    next();
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(routes);

app.listen(DEFAULT_PORT);
