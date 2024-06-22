const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/videos")); // Thư mục lưu trữ video
  },
  filename: function (req, file, cb) {
    // Lấy title từ body request
    const title = req.body.title;

    // Đảm bảo có title để đặt tên file
    if (!title) {
      return cb(new Error("Missing title in request body"));
    }

    // Tạo tên file dựa trên title và loại file
    const fileName = `${title.replace(/[^\w]/g, "_")}.mp4`;

    cb(null, fileName);
  },
});

// Multer upload instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
  fileFilter: function (req, file, cb) {
    // Kiểm tra loại file, chỉ cho phép upload mp4, flv và avi
    if (
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/x-flv" ||
      file.mimetype === "video/x-msvideo"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only MP4, FLV, and AVI files are allowed."
        )
      );
    }
  },
}).single("video"); // Ensure you are using the correct field name here

module.exports = upload;
