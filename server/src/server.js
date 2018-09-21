// import external
import bodyParser from 'body-parser';
import express from 'express';

const MongoClient = require('mongodb').MongoClient;

const app = express();
let db;
// import internal
const { PORT } = require('../config.json');
import helpers from './helpers';

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  'mongodb://hoplb:hophop01@ds157624.mlab.com:57624/todo-api-hoplb',
  (err, client) => {
    if (err) {
      return console.log('Can not connect to database, please check again.');
    }
    db = client.db('todo-api-hoplb');
    // routers
    app.get('/', (req, res) => {
      // res.send('Hello world');
      res.sendFile(__dirname + '/index.html');
    });

    app.post('/quote', (req, res) => {
      db.collection('quotes').save(req.body, (err, response) => {
        if (err) return console.log(err);
        console.log('Saved to database');
        res.send('saved').status(200);
      });
    });

    app.get('/quotes', (req, res) => {
      db.collection('quotes')
        .find()
        .toArray((err, results) => {
          console.log(results);
          res.send(results).status(200);
        });
    });

    app.listen(PORT, () => {
      helpers.common.log(`Server is running at port: ${PORT}`, 'blue');
    });
    console.log('connected');
  }
);
