import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { PAGE_LIMIT } from "../../config.json";

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
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  gender: String,
  avatar: String,
  salt: String,
  fullname: {
    type: String,
    required: false,
    max: 100
  },
  birthday: {
    type: Date,
    default: "",
    trim: true,
    required: false
  },
  createdBy: { type: Schema.ObjectId, ref: "User" },
  updatedBy: { type: Schema.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
  if (!this.avatar) {
    switch (this.gender) {
      case "female":
        this.avatar = "female.png";
      default:
        this.avatar = "male.png";
    }
  }
  next();
});

userSchema.statics = {
  compare(password, passwordPlainText, callback) {
    bcrypt.compare(passwordPlainText, password, (err, result) => {
      callback(result);
    });
  },
  updateById(id, body) {
    return this.findByIdAndUpdate(id, body, false).exec();
  },
  deleteById(id) {
    return this.findByIdAndRemove(id).exec();
  },
  format(row) {
    // todo: needs to correct
    row.id = row._id;
    delete row._id;
    delete row.__v;
    return row;
  },
  load(_id) {
    if (!_id) throw new Error("Id is not found");
    return this.findOne({ _id }).exec();
  },
  list(options) {
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
module.exports = mongoose.model("User", userSchema);
