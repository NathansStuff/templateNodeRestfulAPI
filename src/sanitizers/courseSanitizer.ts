import BadRequestError from '../middleware/Errors/BadRequestError';
import { ICourse } from '../types/ICourse';

export function sanitizeCourse(
  courseData: Partial<ICourse>,
  validateMandatoryFields = false
): Partial<ICourse> {
  const sanitizedCourse: Partial<ICourse> = {};

  if (validateMandatoryFields || courseData.name !== undefined) {
    sanitizedCourse.name = sanitizeName(
      courseData.name,
      validateMandatoryFields
    );
  }

  if (validateMandatoryFields || courseData.description !== undefined) {
    sanitizedCourse.description = sanitizeDescription(
      courseData.description,
      validateMandatoryFields
    );
  }

  if (courseData.topics !== undefined) {
    sanitizedCourse.topics = sanitizeTopics(courseData.topics);
  }

  return sanitizedCourse;
}

function sanitizeName(
  name: string | undefined,
  isMandatory: boolean
): string | undefined {
  if (isMandatory && name === undefined) {
    throw new BadRequestError('Name is undefined');
  }

  if (name != null && name !== undefined && typeof name !== 'string') {
    throw new BadRequestError('Name is not a string');
  }

  if (name != null && name !== undefined) {
    name = name.trim();
    if (name.length < 3) {
      throw new BadRequestError('Name must be at least 3 characters');
    }
    if (name.length > 50) {
      throw new BadRequestError('Name must be less than 50 characters');
    }
  }

  return name;
}

function sanitizeDescription(
  description: string | undefined,
  isMandatory: boolean
): string | undefined {
  if (isMandatory && description === undefined) {
    throw new BadRequestError('Description is undefined');
  }

  if (
    description != null &&
    description !== undefined &&
    typeof description !== 'string'
  ) {
    throw new BadRequestError('Description is not a string');
  }

  if (description != null && description !== undefined) {
    description = description.trim();
    if (description.length < 10) {
      throw new BadRequestError('Description must be at least 10 characters');
    }
    if (description.length > 500) {
      throw new BadRequestError('Description must be less than 500 characters');
    }
  }

  return description;
}

function sanitizeTopics(topics: string[]): string[] {
  if (!Array.isArray(topics)) {
    throw new BadRequestError('Topics is not an array');
  }

  topics.forEach((topic) => {
    if (typeof topic !== 'string') {
      throw new BadRequestError('Topic is not a string');
    }
  });

  return topics;
}
