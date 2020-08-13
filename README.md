To run project - 
1) npm i
2) create secret folder in which create a secretFile.js.
    in secret file data is like this -
        module.exports = {
        facebook:{
            clientID:'123456',                                            // paste your facebook clientID
            clientSecret: '25d2e20d',                                    // paste your facebook clientSecret
            profileFields: ['email', 'displayName', 'photos'],
            callbackURL: 'http://localhost:3030/auth/facebook/callback',
            passReqToCallback: true
            }
        }


3) nodemon server