const ProgressService = require("../services/progress.service");
const { SuccessResponse } = require("../core/success.response");

class ProgressController {
  static async updateProgress(req, res, next) {
    const { userId, courseId, videoId, watchedPercentage } = req.body;
    const progress = await ProgressService.updateProgress(
      userId,
      courseId,
      videoId,
      watchedPercentage
    );
    new SuccessResponse({
      message: "Progress updated successfully",
      metadata: progress,
    }).send(res);
  }

  static async getProgress(req, res, next) {
    const { userId, courseId, videoId } = req.query;
    const progress = await ProgressService.getProgress(
      userId,
      courseId,
      videoId
    );
    new SuccessResponse({
      message: "Progress fetched successfully",
      metadata: progress,
    }).send(res);
  }
}

module.exports = ProgressController;
