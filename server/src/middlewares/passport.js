const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
import helpers from "../helpers";

const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      email: "user[email]",
      password: "user[password]"
    },
    (email, password, done) => {
      helpers.common.log(`#email: ${email}`, "blue");
      User.findOne({ email })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { "email or password": "is invalid" }
            });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);
