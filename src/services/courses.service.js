const Course = require("../models/courses.model");
const Video = require("../models/video.model");
class CourseService {
  async create(courseData) {
    try {
      const newCourse = new Course(courseData);
      const savedCourse = await newCourse.save();
      return savedCourse;
    } catch (error) {
      throw error;
    }
  }
  async getCourseById(courseId, videoData) {
    try {
      console.log(courseId);
      const course = await Course.findById(courseId).populate("videos").exec();
      console.log(course); // Log để kiểm tra kết quả tìm thấy
      return course;
    } catch (error) {
      throw error;
    }
  }
  async viewAll() {
    try {
      const courses = await Course.find({}).populate(
        "instructor",
        "firstname lastname"
      ); // Populate instructor details
      return courses;
    } catch (error) {
      throw error;
    }
  }

  async getVideoById(videoId) {
    return await Video.findById(videoId).exec();
  }
}

module.exports = new CourseService();
