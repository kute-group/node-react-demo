import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: false,
    max: 100
  },
  age: {
    type: String,
    required: false
  }
});

userSchema.statics.authenticate = function(password, passwordNow, callback) {
  bcrypt.compare(password, passwordNow, (err, result) => {
    callback(result);
  });
};

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// export the model
module.exports = mongoose.model('User', userSchema);
