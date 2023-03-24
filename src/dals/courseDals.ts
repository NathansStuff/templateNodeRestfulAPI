import CourseModel from '../models/courseModel';
import { ICourse } from '../types/Learning/ICourse';

// Create a new course
export async function createCourse(
  courseData: Partial<ICourse>
): Promise<ICourse> {
  const course = new CourseModel(courseData);
  return await course.save();
}

// Find all courses
export async function findCourses(): Promise<ICourse[]> {
  return await CourseModel.find();
}

// Find a course by ID
export async function findCourseById(
  courseId: string
): Promise<ICourse | null> {
  return await CourseModel.findById(courseId);
}

// Update a course by ID
export async function updateCourseById(
  courseId: string,
  courseData: Partial<ICourse>
): Promise<ICourse | null> {
  return await CourseModel.findByIdAndUpdate(courseId, courseData, {
    new: true,
  });
}

// Delete a course by ID
export async function deleteCourseById(
  courseId: string
): Promise<ICourse | null> {
  return await CourseModel.findByIdAndDelete(courseId);
}
