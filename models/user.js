
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

const userSchema = mongoose.Schema({
    username : {
        type: String,
        unique: true
    },
    fullname: {
        type: String,
        unique: true,
        default: ''
    },
    email : {
        type: String,
        unique: true
    },
    password: {
        type: String,
        default: ''
    },
    userImage: {
        type: String,
        default: 'default.png'
    },
    facebook: {
        type: String,
        unique: true,
        default: ''
    },
    fbTokens: Array,
    google: {
        type: String,
        unique: true,
        default: ''
    },
    googleTokens: Array
});

/**
 * to encrypt user password
 */
userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(passport, bcrypt.genSaltSync(10), null);   // 10 is hash password length
};

/**
 * to decrypt the password when user login
 */
userSchema.methods.validUserPassword = function(password) {
    return bcrypt.compareSync(password, this.password);         // compare password with hash password
};


module.exports = mongoose.model('User', userSchema);