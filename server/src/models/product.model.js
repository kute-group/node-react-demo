import mongoose from "mongoose";
import { PAGE_LIMIT } from "../../config.json";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  price: { type: String, required: true },
  reviews: [
    {
      content: {
        type: String,
        default: "",
        trim: true
      },
      createdBy: {
        type: Schema.ObjectId,
        ref: "User"
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdBy: { type: Schema.ObjectId, ref: "User" },
  updatedBy: { type: Schema.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

productSchema.methods = {
  createReview(user, content) {
    this.reviews.push({
      content,
      createdBy: user._id
    });
    return this.save();
  },
  removeReview(reviewId) {
    const index = this.reviews.map(review => review.id).indexOf(reviewId);
    if (~index) this.reviews.splice(index, 1);
    else throw new Error("Review not found");
    return this.save();
  }
};

productSchema.statics = {
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
    return this.findOne({ _id })
      .populate("user", "name email username")
      .exec();
  },
  list(options) {
    const criteria = options.criteria || {};
    const page = options.page < 0 ? 0 : options.page;
    const limit = options.limit < 0 ? PAGE_LIMIT : options.limit;
    return this.find(criteria)
      .populate("user", " name username")
      .sort({ createAt: -1 })
      .skip(limit * page)
      .limit(parseInt(limit))
      .exec();
  }
};

// export the model
module.exports = mongoose.model("Product", productSchema);
