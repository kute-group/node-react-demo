import mongoose from "mongoose";
import { PAGE_LIMIT } from "../../config.json";

const Schema = mongoose.Schema;

const productCatSchema = new Schema({
	name: { type: String, required: true },
	description: String,
  createdBy: { type: Schema.ObjectId, ref: "User" },
  updatedBy: { type: Schema.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


productCatSchema.statics = {
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
module.exports = mongoose.model("ProductCat", productCatSchema);
