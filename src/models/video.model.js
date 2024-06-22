const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    duration: { type: Number, required: true }, // Độ dài của video (đơn vị giây)
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("Video", videoSchema);
