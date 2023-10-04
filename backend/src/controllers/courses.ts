import { RequestHandler } from "express";
import CourseModel from "../models/course";
import createHttpError from "http-errors";
import mongoose from "mongoose";

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
    const courseId = req.params.courseId;

    if (!mongoose.isValidObjectId(courseId)) {
      throw createHttpError(400, "Invalid course id");
    }

    const course = await CourseModel.findById(courseId).exec();

    if (!course) {
      throw createHttpError(404, "Course not found");
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

interface CreateCourseBody {
  name?: string;
  code?: string;
  description?: string;
}

export const createCourse: RequestHandler<
  unknown,
  unknown,
  CreateCourseBody,
  unknown
> = async (req, res, next) => {
  try {
    const name = req.body.name;
    const code = req.body.code;
    const description = req.body.description;
    if (!name || !code || !description) {
      throw createHttpError(
        400,
        `Missing required fields: ${!name ? "name, " : ""}${
          !code ? "code," : ""
        } ${!description ? "description" : ""}`
      );
    }
    const course = await CourseModel.create({ name, code, description });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

interface UpdateCourseParams {
  courseId: string;
}

interface UpdateCourseBody {
  name?: string;
  code?: string;
  description?: string;
}

export const updateCourse: RequestHandler<
  UpdateCourseParams,
  unknown,
  UpdateCourseBody,
  unknown
> = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    if (!mongoose.isValidObjectId(courseId)) {
      throw createHttpError(400, "Invalid course id");
    }

    const name = req.body.name;
    const code = req.body.code;
    const description = req.body.description;

    if (!name || !code || !description) {
      throw createHttpError(
        400,
        `Missing required fields: ${!name ? "name, " : ""}${
          !code ? "code," : ""
        } ${!description ? "description" : ""}`
      );
    }

    const course = await CourseModel.findById(courseId).exec();
    console.log(course);

    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    course.name = name;
    course.code = code;
    course.description = description;

    const updatedCourse = await course.save();

    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse: RequestHandler = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    if (!mongoose.isValidObjectId(courseId)) {
      throw createHttpError(400, "Invalid course id");
    }

    const course = await CourseModel.findById(courseId).exec();

    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    await course.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
