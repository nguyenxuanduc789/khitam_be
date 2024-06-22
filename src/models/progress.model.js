const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const progressSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true }, // Người dùng
    course: { type: Types.ObjectId, ref: "Course", required: true }, // Khóa học
    video: { type: Types.ObjectId, ref: "Video" }, // Video đang xem
    watchedPercentage: { type: Number, default: 0 }, // Phần trăm đã xem của video
    completed: { type: Boolean, default: false }, // Đã hoàn thành bài học hay chưa
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("Progress", progressSchema);
