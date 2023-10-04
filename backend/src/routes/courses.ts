import express from "express";
import * as CourseController from "../controllers/courses";

const router = express.Router();

router.get("/", CourseController.getCourses);

router.get("/:courseId", CourseController.getCourse);

router.post("/", CourseController.createCourse);

router.patch("/:courseId", CourseController.updateCourse);

router.delete("/:courseId", CourseController.deleteCourse);

export default router;
