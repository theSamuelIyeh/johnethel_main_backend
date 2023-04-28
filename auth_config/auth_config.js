const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

function passportConfig(passport) {

     passport.serializeUser((user, done) => {
         done(null, user._id);
     });

     passport.deserializeUser(async (id, done) => {
         try {
             const user = await User.find({ _id: id });
             done(null, user);
         } catch (error) {
             done(error);
         }
     });


     passport.use(new LocalStrategy({
         usernameField: 'email',
         passwordField: 'password'
     }, async (email, password, done) => {
         try {
            const user = await User.findOne({ email: email });
            if (user === null) {
                return done(null, false, { message: 'Invalid Credentials' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
              return done(null, false, { message: 'Invalid Credentials' });
           }
           return done(null, user);
        } catch (error) {
           return done(error);
        }
       }));
   }
  
module.exports = passportConfig;
