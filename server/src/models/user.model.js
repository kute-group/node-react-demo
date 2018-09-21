import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  age: { type: String, required: true }
});

// export the model
module.exports = mongoose.model('User', userSchema);
