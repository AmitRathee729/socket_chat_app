'use strick';

module.exports = function(_, passport, User){

    return {
        SetRouting: function(router) {
            /**
             * Add router here e.g- get/post/put/delete
             */
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);
            router.get('/auth/facebook', this.getFacebookLogin);
            router.get('/auth/facebook/callback', this.getFacebookLoginCallback);

            router.post('/', User.LoginValidation, this.postLogin);
            router.post('/signup', User.SignUpValidation, this.postSignUp);
        },

        indexPage: function(req, res) {
            const errors = req.flash('error');      // 'error' same as in User.js file which is in helpers folder
            return res.render('index', {title: 'Socket Chat APP | Login', messages: errors, hasErrors: errors.length > 0});
        },

        /**
         * local.login is taken from passport --> passport-local.js
         */
        postLogin: passport.authenticate('local-login', {
            // if successfully login then redirect to home page
            successRedirect: '/home',
            // if login fails then redirect to again login page
            failureRedirect: '/',
            failureFlash: true
        }),

        getSignUp: function(req, res){
            const errors = req.flash('error');      // 'error' same as in User.js file which is in helpers folder
            return res.render('signup', {title: 'Socket Chat APP | SignUp', messages: errors, hasErrors: errors.length > 0});
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

        /**
         * facebook login
         */
        getFacebookLogin: passport.authenticate('facebook', {
            scope: 'email'
        }),

        /**
         * facebook login callback
         */
        getFacebookLoginCallback: passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),

        homePage: function(req, res){
            return res.render('home');
        }
    }
}