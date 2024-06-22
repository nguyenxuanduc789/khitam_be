const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const CourseService = require("../services/courses.service");
const fs = require("fs");
class CoursesController {
  async create(req, res, next) {
    try {
      const { title, description, instructor, price, imageUrl, videos } =
        req.body;
      const courseData = {
        title,
        description,
        instructor,
        price,
        imageUrl,
        videos,
      };

      const createdCourse = await CourseService.create(courseData);
      new SuccessResponse({
        message: "Course created successfully",
        metadata: createdCourse,
      }).send(res);
    } catch (error) {
      next(error); // Forward error to the error handling middleware
    }
  }
  async getVideoToCourse(req, res, next) {
    try {
      const course = await CourseService.getCourseById(req.params.id);
      if (!course) {
        return res.status(404).send({ message: "Course not found" });
      }
      res.status(200).send(course);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async viewAll(req, res, next) {
    try {
      const courses = await CourseService.viewAll();
      new SuccessResponse({
        message: "Courses retrieved successfully",
        metadata: courses,
      }).send(res);
    } catch (error) {
      next(error); // Forward error to the error handling middleware
    }
  }
  async streamVideo(req, res, next) {
    try {
      const videoId = req.params.videoId;
      const video = await CourseService.getVideoById(videoId);
      if (!video) {
        return res.status(404).send({ message: "Video not found" });
      }

      const videoPath = video.url;
      const videoSize = fs.statSync(videoPath).size;

      const range = req.headers.range;
      if (!range) {
        return res.status(416).send({ message: "Range not found" });
      }

      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, headers);

      const videoStream = fs.createReadStream(videoPath, { start, end });
      videoStream.pipe(res);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new CoursesController();
