var express = require('express')
const app = express()
var indexRouter = require('./routes/index');

process.env.PORT = 3000;

app.use('/', indexRouter);

exports.app = app;

app.listen(process.env.PORT, () => console.log('Listening on port 3000'));
