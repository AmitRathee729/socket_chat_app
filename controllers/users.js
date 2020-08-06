'use strick';

module.exports = function(_){

    return {
        SetRouting: function(router) {
            /**
             * Add router here e.g- get/post/put/delete
             */
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
        },

        indexPage: function(req, res) {
            return res.render('index')
        },
        getSignUp: function(req, res){
            return res.render('signup');
        }
    }
}