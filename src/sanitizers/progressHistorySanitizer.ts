import BadRequestError from '../middleware/Errors/BadRequestError';
import { IProgressHistory } from '../types/IProgressHistory';

export function sanitizeProgressHistory(
  progressHistory: Partial<IProgressHistory>
): Partial<IProgressHistory> {
  const sanitizedProgressHistory: Partial<IProgressHistory> = {};

  sanitizedProgressHistory.progress = sanitizeProgress(
    progressHistory.progress
  );

  sanitizedProgressHistory.score = sanitizeScore(progressHistory.score);

  return sanitizedProgressHistory;
}

function sanitizeProgress(progress: string | undefined): string {
  if (progress == null || progress === undefined) {
    throw new BadRequestError('Progress is undefined');
  }

  if (typeof progress !== 'string') {
    throw new BadRequestError('Progress is not a string');
  }

  if (progress.length < 3) {
    throw new BadRequestError('Progress must be at least 3 characters');
  }

  if (progress.length > 50) {
    throw new BadRequestError('Progress must be less than 50 characters');
  }

  return progress;
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
