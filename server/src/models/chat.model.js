import mongoose from "mongoose";
import { PAGE_LIMIT } from "../../config.json";

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  content: { type: String, required: true },
  createdBy: { type: Schema.ObjectId, ref: "User" },
  updatedBy: { type: Schema.ObjectId, ref: "User" },
  createdAt: { type: Date, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

chatSchema.statics = {
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
      .exec();
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
module.exports = mongoose.model("Product", chatSchema);
