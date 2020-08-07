const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

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
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email}, (err, user)=> {
        // if err by internet connect or something else
        if(err) {
            return done(err);
        }
        // if user is already in database
        if (user) {
            return done(null, false, req.flash('error', 'User with this emaill already exist'))
        }
        
        // if no user with this email id in DB
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        
        // save newUser data in DB
        newUser.save((err) => {
            done(null, newUser);
        });
    });
}));

/**
 * Passport for local login
 */
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({'email': email}, (err, user)=> {
        // if err by internet connect or something else
        if(err) {
            return done(err);
        }
        const messages = [];
        // if user doesn't exist or password is wrong
        if(!user || !user.validUserPassword(password)) {
            messages.push('Email does not exist or password is Invalid');
            return done(null, false, req.flash('error', messages));
        } 
        // if all conditions full fill
        return done(null, user)
     
    });
}));