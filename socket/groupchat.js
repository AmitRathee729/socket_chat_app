/**
 * Server side 
 */
module.exports = function(io){
    io.on('connection', (socket) => {
        console.log('user connected')
    })
}