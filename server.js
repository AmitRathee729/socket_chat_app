const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

const container = require('./container.');

container.resolve(function(users) {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/SOCKET_CHAT_APP',  { useUnifiedTopology: true });
    
    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(3030, function () {
            console.log('Listening on port 3030');
        });
        ConfigureExrepss(app);
        /***
         * Setup router
         */
        const router = require('express-promise-router')();
        // passing all routers from users file in controllers folder
        users.SetRouting(router);

        app.use(router);
    }

    function ConfigureExrepss(app){
        require('./passport/passport-local');

        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(session({
            secret: 'thisisasecretkey',
            resave: true,
            saveUninitialized: false,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));
        app.use(flash());

        app.use(passport.initialize());
        app.use(passport.session());
    }
});