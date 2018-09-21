import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let productSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  price: { type: String, required: true }
});

// export the model
module.exports = mongoose.model('Product', productSchema);
