const Video = require("../models/video.model");

class VideoService {
  static async createVideo(videoData) {
    try {
      // Create a new video document in the database
      const newVideo = await Video.create(videoData);
      return newVideo;
    } catch (error) {
      throw new Error(`Failed to create video: ${error.message}`);
    }
  }

  static async updateVideoUrl(videoId, url) {
    try {
      // Update the video document with the new URL
      const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { url: url },
        { new: true }
      );
      if (!updatedVideo) {
        throw new Error("Video not found");
      }
      return updatedVideo;
    } catch (error) {
      throw new Error(`Failed to update video URL: ${error.message}`);
    }
  }
}

module.exports = VideoService;
