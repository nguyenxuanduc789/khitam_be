
const { model, Schema } = require('mongoose');
const DOCUMENT_NAME = 'Codemail';
const COLLECTION_NAME = 'Codemails';

// Tạo lược đồ cho Category
const code_mailsSchema = new Schema(
  {
    email: { type: String, required: true },
    code : { type: String, required: true }, 
    is_verify: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
module.exports = model(DOCUMENT_NAME, code_mailsSchema);
    