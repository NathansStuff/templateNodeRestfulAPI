import { Response, Request } from 'express';
import {
  getCourses,
  createNewCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../services/courseService';

// @desc Get all Courses
// @route GET /api/courses
// @access Private
export async function getCoursesHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const courses = await getCourses();
  return res.status(200).json(courses);
}

// @desc Create a new Course
// @route POST /api/courses
// @access Private
export async function createCourseHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const courseData = req.body;
  const newCourse = await createNewCourse(courseData);
  return res.status(201).json(newCourse);
}

// @desc Get a Course by ID
// @route GET /api/courses/:id
// @access Private
export async function getCourseHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const courseId = req.params.id;
  const course = await getCourseById(courseId);
  return res.status(200).json(course);
}

// @desc Update a Course by ID
// @route PUT /api/courses/:id
// @access Private
export async function updateCourseHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const courseId = req.params.id;
  const courseData = req.body;
  const updatedCourse = await updateCourse(courseId, courseData);
  return res.status(200).json(updatedCourse);
}

// @desc Delete a Course by ID
// @route DELETE /api/courses/:id
// @access Private
export async function deleteCourseHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const courseId = req.params.id;
  await deleteCourse(courseId);
  return res.status(204).json({ message: 'Course deleted successfully' });
}
