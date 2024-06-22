const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const lessonSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: Types.ObjectId, ref: "Course", required: true },
    videos: [{ type: Types.ObjectId, ref: "Video" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("Lesson", lessonSchema);
