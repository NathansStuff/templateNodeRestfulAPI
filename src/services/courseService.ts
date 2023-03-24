import {
  createCourse,
  findCourses,
  findCourseById,
  updateCourseById,
  deleteCourseById,
} from '../dals/courseDals';
import { sanitizeCourse } from '../sanitizers/courseSanitizer';
import { ICourse } from '../types/ICourse';
import { deleteTopicsByCourseId } from './topicService';

// Create a new course
export async function createNewCourse(courseData: ICourse): Promise<ICourse> {
  const sanitizedCourseData = sanitizeCourse(courseData, true);
  const course = await createCourse(sanitizedCourseData);
  return course;
}

// Get all courses
export async function getCourses(): Promise<ICourse[]> {
  const courses = await findCourses();
  return courses;
}

// Get a course by ID
export async function getCourseById(courseId: string): Promise<ICourse | null> {
  const course = await findCourseById(courseId);
  return course;
}

// Update a course by ID
export async function updateCourse(
  courseId: string,
  courseData: Partial<ICourse>
): Promise<ICourse | null> {
  const sanitizedCourseData = sanitizeCourse(courseData, false);
  const updatedCourse = await updateCourseById(courseId, sanitizedCourseData);
  return updatedCourse;
}

// Delete a course by ID
export async function deleteCourse(courseId: string): Promise<ICourse | null> {
  // First, delete all associated topics
  await deleteTopicsByCourseId(courseId);

  // Then, delete the course
  const deletedCourse = await deleteCourseById(courseId);
  return deletedCourse;
}
