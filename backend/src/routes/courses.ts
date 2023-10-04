import express from "express";
import * as CourseController from "../controllers/courses";

const router = express.Router();

router.get("/", CourseController.getCourses);

router.get("/:courseId", CourseController.getCourse);

router.post("/", CourseController.createCourse);

export default router;
