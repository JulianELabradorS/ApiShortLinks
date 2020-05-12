const express = require('express');
const config = require('./config');
const router = require('./network/router');
const db = require('./dataBase');
const errorHandler = require('./utils/errorHandler');
const cookieParser = require('cookie-parser');
var cors = require('cors');

//CONEXION A DB
db(config.dbUrl, config.dbName);
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

router(app);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`El servidor esta escuchando en  http://localhost:${config.port}`);
});
