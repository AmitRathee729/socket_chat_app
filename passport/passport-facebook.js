const passport = require('passport');
const User = require('../models/user');
const secretFile = require('../secret/secretFile');
const FacebookStrategy = require('passport-facebook').Strategy;

/**
 * After login, user id will store in session
 */
passport.serializeUser((user, done) =>{
    done(null, user.id)
});

/**
 * After stored id in session, here we compare stored with User collection id
 * if id is found then it return user
 * if id is not found then it return err
 */
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

/**
 * Passport for local signup
 */
passport.use( new FacebookStrategy({
    clientID: secretFile.facebook.clientID,
    clientSecret: secretFile.facebook.clientSecret,
    profileFields: secretFile.facebook.profileFields,
    callbackURL: secretFile.facebook.callbackURL,
    passReqToCallback: secretFile.facebook.passReqToCallback,
}, (req, token, refreshToken, profile, done) => {
    console.log('this is prolie', profile);
    User.findOne({facebook: profile.id}, (err, user)=> {
        // if err by internet connect or something else
        if(err) {
            return done(err);
        }
        // if user is already in database then do login
        if (user) {
            return done(null, user)
        } else {
        // if user is not found in DB then do sign up
        const newUser = new User();

        newUser.facebook = profile.id;
        newUser.fullname = profile.displayName;
        newUser.username = profile.displayName;
        newUser.email = profile._json.email;
        newUser.userImage = 'https://graph.facebook.com/' + profile.id+ '/picture?type=large';
        newUser.fbTokens.push({token: token});

        newUser.save((err) => {
            return done(null, user)
        })
        }
    }) 
}));
