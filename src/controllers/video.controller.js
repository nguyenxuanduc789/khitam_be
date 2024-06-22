const VideoService = require("../services/video.service");
const fs = require("fs");
const path = require("path");

class VideoController {
  static async uploadVideo(req, res) {
    try {
      // Lấy thông tin từ file đã upload
      const uploadedVideo = req.file;
      const { title, description, duration, id_video } = req.body;

      // Kiểm tra các trường cần thiết trong req.body
      if (!id_video || !title || !description || !duration) {
        throw new Error(
          "Missing required fields: id_video, title, description, or duration"
        );
      }

      // Tạo video mới trong cơ sở dữ liệu
      const newVideo = await VideoService.createVideo({
        title,
        description,
        duration,
      });

      // Đặt tên file MP4 theo _id của video
      const newFileName = `${id_video}.mp4`; // Đặt tên file theo _id.mp4
      const newPath = path.join(__dirname, `../uploads/videos/${newFileName}`); // Đường dẫn mới

      // Di chuyển file đã upload vào đường dẫn mới
      fs.renameSync(uploadedVideo.path, newPath);

      // Cập nhật đường dẫn URL của video vào cơ sở dữ liệu
      await VideoService.updateVideoUrl(newVideo._id, newPath);

      // Trả về kết quả cho client
      return res.status(200).json({
        status: "success",
        message: "File uploaded and video created successfully",
        data: {
          video: newVideo,
          fileName: newFileName,
          filePath: newPath,
          fileSize: uploadedVideo.size,
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = VideoController;
