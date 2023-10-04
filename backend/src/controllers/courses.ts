import { RequestHandler } from "express";
import CourseModel from "../models/course";

export const getCourses: RequestHandler = async (req, res, next) => {
  try {
    const courses = await CourseModel.find().exec();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

export const getCourse: RequestHandler = async (req, res, next) => {
  try {
    const course = await CourseModel.findById(req.params.courseId).exec();
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const createCourse: RequestHandler = async (req, res, next) => {
  try {
    const name = req.body.name;
    const code = req.body.code;
    const description = req.body.description;
    const course = await CourseModel.create({ name, code, description });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};
