const { model, Schema, Types } = require("mongoose");

const EnrollmentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    course: { type: Types.ObjectId, ref: "Course", required: true },
    enrolled_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("Enrollment", EnrollmentSchema);
