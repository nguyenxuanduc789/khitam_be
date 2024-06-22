const Progress = require("../models/progress.model");

class ProgressService {
  static async updateProgress(userId, courseId, videoId, watchedPercentage) {
    const progress = await Progress.findOneAndUpdate(
      { user: userId, course: courseId, video: videoId },
      {
        watchedPercentage,
        completed: watchedPercentage === 100,
      },
      { new: true, upsert: true }
    );

    return progress;
  }

  static async getProgress(userId, courseId, videoId) {
    return Progress.findOne({ user: userId, course: courseId, video: videoId });
  }
}

module.exports = ProgressService;
