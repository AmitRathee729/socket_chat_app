'use strick';
const passport = require('passport');

module.exports = function(_){

    return {
        SetRouting: function(router) {
            /**
             * Add router here e.g- get/post/put/delete
             */
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);

            router.post('/signup', this.postSignUp);
        },

        indexPage: function(req, res) {
            return res.render('index')
        },
        getSignUp: function(req, res){
            return res.render('signup');
        },
        /**
         * local.signup is taken from passport --> passport-local.js
         */
        postSignUp: passport.authenticate('local-signup', {
            // if successfully login then redirect to home page
            successRedirect: '/home',
            // if login fails then redirect to signup page
            failureRedirect: '/signup',
            failureFlash: true
        }),
        homePage: function(req, res){
            return res.render('home');
        }
    }
}