require('dotenv').config(); // this is important!
module.exports = {
"development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_URL,
    "dialect": "mysql",
    "define": {
      "freezeTableName": true
    }
},
"test": {
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "host": process.env.DB_URL,
  "dialect": "mysql",
  "define": {
    "freezeTableName": true
  }
},
"production": {
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "host": process.env.DB_URL,
  "dialect": "mysql",
  "define": {
    "freezeTableName": true
  }
}
};
