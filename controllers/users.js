'use strick';

module.exports = function(_){

    return {
        SetRouting: function(router) {
            /**
             * Add router here e.g- get/post/put/delete
             */
            router.get('/', this.indexPage);
        },

        indexPage: function(req, res) {
            return res.render('index', {test: 'This is a test'})
        }
    }
}