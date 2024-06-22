const { model, Schema, Types } = require("mongoose");
const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    password: { type: String, required: true },
    otpSentAt: { type: Date },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      required: true,
    }, // Thêm role vào schema
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
module.exports = model(DOCUMENT_NAME, userSchema);
