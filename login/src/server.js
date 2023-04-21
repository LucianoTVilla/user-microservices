const express = require('express');
const cors = require('cors');

require('dotenv').config({path:__dirname+'/.env'})

const connection = require('./db/connection');

const routes = require('./routes');

const app = express();

app.use(cors())
app.use(express.json());
app.use('', routes);

app.listen(3000, async () => {
  console.log('Login service listening on port 3000!');
  await connection()
});
