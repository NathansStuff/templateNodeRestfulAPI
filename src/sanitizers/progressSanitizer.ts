import BadRequestError from '../middleware/Errors/BadRequestError';
import { IProgress } from '../types/Learning/IProgress';

export function sanitizeProgress(
  progress: Partial<IProgress>,
  validateMandatoryFields = false
): Partial<IProgress> {
  const sanitizedCourse: Partial<IProgress> = {};

  if (validateMandatoryFields || progress.user !== undefined) {
    sanitizedCourse.user = sanitizeUserId(progress.user);
  }

  if (validateMandatoryFields || progress.topic !== undefined) {
    sanitizedCourse.topic = sanitizeTopic(
      progress.topic,
      validateMandatoryFields
    );
  }

  sanitizedCourse.score = sanitizeScore(progress.score);

  return sanitizedCourse;
}

function sanitizeScore(score: number | undefined): number {
  if (typeof score !== 'number') {
    throw new BadRequestError('Score is not a number');
  }

  if (score < 0) {
    throw new BadRequestError('Score must be greater than 0');
  }

  if (score > 100) {
    throw new BadRequestError('Score must be less than 100');
  }

  return score;
}

function sanitizeTopic(
  topic: string | undefined,
  isMandatory: boolean
): string | undefined {
  if (isMandatory && topic === undefined) {
    throw new BadRequestError('Topic is undefined');
  }

  if (topic != null && topic !== undefined && typeof topic !== 'string') {
    throw new BadRequestError('Topic is not a string');
  }

  if (topic != null && topic !== undefined) {
    topic = topic.trim();
    if (topic.length < 10) {
      throw new BadRequestError('Topic must be at least 10 characters');
    }
    if (topic.length > 500) {
      throw new BadRequestError('Topic must be less than 500 characters');
    }
  }

  return topic;
}

function sanitizeUserId(userId: string | undefined): string {
  if (userId === undefined) {
    throw new BadRequestError('User ID is undefined');
  }

  if (userId != null && userId !== undefined && typeof userId !== 'string') {
    throw new BadRequestError('User ID is not a string');
  }

  if (userId != null && userId !== undefined) {
    userId = userId.trim();
    if (userId.length < 10) {
      throw new BadRequestError('User ID must be at least 10 characters');
    }
    if (userId.length > 50) {
      throw new BadRequestError('User ID must be less than 50 characters');
    }
  }

  return userId;
}
