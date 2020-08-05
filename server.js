const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container.');
const { Router } = require('express');
const { userInfo } = require('os');
const { timeStamp } = require('console');


container.resolve(function(users) {
    
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
        app.use(express.static('public'));
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
    }
});