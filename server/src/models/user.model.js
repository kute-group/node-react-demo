import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
import { PAGE_LIMIT } from '../../config.json';

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
  salt: String,
  fullname: {
    type: String,
    required: false,
    max: 100
  },
  birthday: {
    type: Date,
    trim: true,
    required: false
  },
  createdBy: { type: Schema.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

userSchema.methods.validatePassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.password === hash;
};

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    'secret'
  );
};

userSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
};

userSchema.statics = {
  authenticate: function(password, passwordNow, callback) {
    bcrypt.compare(password, passwordNow, (err, result) => {
      callback(result);
    });
  },
  updateById: function(id, body) {
    return this.findByIdAndUpdate(id, body, false).exec();
  },
  deleteById: function(id) {
    return this.findByIdAndRemove(id).exec();
  },
  format: function(row) {
    //todo: needs to correct
    row.id = row._id;
    delete row._id;
    delete row.__v;
    return row;
  },
  load: function(_id) {
    return this.findOne({ _id }).exec();
  },
  list: function(options) {
    const criteria = options.criteria || {};
    const page = options.page < 0 ? 0 : options.page;
    const limit = options.limit < 0 ? PAGE_LIMIT : options.limit;
    return this.find(criteria)
      .sort({ createAt: -1 })
      .skip(limit * page)
      .limit(parseInt(limit))
      .exec();
  }
};

// export the model
module.exports = mongoose.model('User', userSchema);
