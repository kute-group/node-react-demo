// import external
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

// import internal
const { PORT, DB } = require('../config.json');
import routers from './routers';
import helpers from './helpers';

const app = express();

// connect to database
mongoose.connect(DB);
mongoose.connection.on('error', () =>
  helpers.common.log('Connect failed...', 'red')
);
mongoose.connection.on('connected', () =>
	helpers.common.log('Connected database...', 'green')
);

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use;

// routers
app.use('/api/v1', routers);

app.listen(PORT, () => {
  helpers.common.log(`Server is running at port: ${PORT}`, 'blue');
});