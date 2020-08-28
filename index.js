const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./mongo');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: db
        })
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

let routes = require('./routes/router');
app.use('/', routes);

app.use((req, res, next) => {
    let err = new Error('File tidak ditemukan');
    err.status = 404;
    next(err);
});

const port = 8080 | process.env.PORT;
const server = 'localhost';

app.listen(port, () => {
    console.log('app running on port ' + port)
})