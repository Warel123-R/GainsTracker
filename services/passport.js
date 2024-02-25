const passport = require('passport');
console.log("1");
const GoogleStrategy= require('passport-google-oauth20').Strategy;
console.log("2");

const keys = require('../config/dev');
console.log("3");

const mongoose = require('mongoose');
console.log("4");

//const User = mongoose.model('users');
User = require('../models/User');
console.log("5");


passport.serializeUser((user, done)=>{
    //console.log("serialize");
    done(null, user.id);
    //console.log(user);
});

passport.deserializeUser((id, done)=>{
    // console.log("deserialize");
    // console.log(id);
    User.findById(id)
        .then(user=>{
            done(null, user);
        })
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleId: profile.id});
    //console.log(profile.id);
    if(existingUser){
         console.log("Now we are here");
        console.log("searching through users in google strategy");
        //we already have a record with the given profile ID
        return done(null, existingUser);
    }
    
    console.log("this user does not exist");
    //we don't have a user record with this ID. Make a new record
    const user = await new User({googleId: profile.id}).save();
    done(null, user);
    
}));

