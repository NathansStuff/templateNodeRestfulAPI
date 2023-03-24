import BadRequestError from '../middleware/Errors/BadRequestError';
import { ITopic } from '../types/ITopic';
import mongoose, { ObjectId } from 'mongoose';
import { sanitizeObjectId } from './sanitizeObjectId';

export function sanitizeTopic(
  topic: Partial<ITopic>,
  isCreating: boolean
): ITopic {
  const sanitizedTopic: Partial<ITopic> = {};

  sanitizedTopic.course = sanitizeCourse(topic.course);

  if (isCreating) {
    if (
      topic.name == null ||
      topic.description == null ||
      topic.weight == null ||
      topic.course == null
    ) {
      throw new BadRequestError('Missing required fields');
    }
  }

  if (topic.name != null) {
    sanitizedTopic.name = sanitizeName(topic.name);
  }

  if (topic.description != null) {
    sanitizedTopic.description = sanitizeDescription(topic.description);
  }

  if (typeof topic.weight === 'number') {
    sanitizedTopic.weight = topic.weight;
  }

  if (topic.course != null) {
    sanitizedTopic.course = topic.course;
  }

  return sanitizedTopic as ITopic;
}

function sanitizeName(name: string): string {
  if (typeof name !== 'string') {
    throw new BadRequestError('Name is not a string');
  }

  name = name.trim();
  if (name.length < 3) {
    throw new BadRequestError('Name must be at least 3 characters');
  }
  if (name.length > 50) {
    throw new BadRequestError('Name must be less than 50 characters');
  }

  return name;
}

function sanitizeDescription(description: string): string {
  if (typeof description !== 'string') {
    throw new BadRequestError('Description is not a string');
  }

  description = description.trim();
  if (description.length < 3) {
    throw new BadRequestError('Description must be at least 3 characters');
  }
  if (description.length > 250) {
    throw new BadRequestError('Description must be less than 250 characters');
  }

  return description;
}

function sanitizeCourse(course: string | undefined | ObjectId): ObjectId {
  if (course == null) {
    throw new BadRequestError('Course is undefined');
  }

  if (typeof course === 'string') {
    sanitizeObjectId(course);

    return course as unknown as ObjectId;
  }

  if (course instanceof mongoose.Types.ObjectId) {
    return course;
  }

  throw new BadRequestError('Course is not a valid ObjectId');
}
