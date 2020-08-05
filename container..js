const dependable = require('dependable');
const path = require('path');

const container = dependable.container();
/**
 *
 *    load modules here which will use multiple times in our project
 */
const simpleDependecies = [
    /***
     * at index 0 we can give any name
     * index 1 must be same as package name
     */
    ['_', 'lodash'],             //  const _ = require('lodash');
];

/***
 * this check simpleDependecies array at each index
 * in this, it will check 
 */
simpleDependecies.forEach(function (val) {
    container.register(val[0], function () {
        return require(val[1])
    })
})

/***
 *  we can use container modules in every files which comes under controllers and helpers folder
 */
container.load(path.join(__dirname, '/controllers'))
container.load(path.join(__dirname, '/helpers'))

/**
 * register container modules and ready to export
 */
container.register('container', function () {
    return container
})

module.exports = container;