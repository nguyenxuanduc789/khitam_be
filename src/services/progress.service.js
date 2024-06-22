const Progress = require("../models/progress.model");

class ProgressService {
  static async updateProgress(userId, courseId, videoId, watchedPercentage) {
    try {
      let progress = await Progress.findOne({
        user: userId,
        course: courseId,
        video: videoId,
      });

      if (!progress) {
        progress = new Progress({
          user: userId,
          course: courseId,
          video: videoId,
          watchedPercentage: watchedPercentage,
        });
      } else {
        progress.watchedPercentage = watchedPercentage;
        progress.completed = watchedPercentage === 100;
      }

      await progress.save();
      return progress;
    } catch (error) {
      console.error("Error updating progress:", error);
      throw new Error("Failed to update progress");
    }
  }
  static async getProgress(userId, courseId, videoId) {
    return Progress.findOne({ user: userId, course: courseId, video: videoId });
  }
}

module.exports = ProgressService;
