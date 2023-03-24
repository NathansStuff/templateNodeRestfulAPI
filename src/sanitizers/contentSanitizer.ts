import BadRequestError from '../middleware/Errors/BadRequestError';
import { IContent } from '../types/IContent';

// Sanitize content data
export function sanitizeContent(
  contentData: Partial<IContent>,
  isCreating: boolean
): Partial<IContent> {
  const sanitizedData: Partial<IContent> = {};

  sanitizedData.topic = sanitizeTopic(contentData.topic, isCreating);
  sanitizedData.title = sanitizeTitle(contentData.title, isCreating);

  sanitizedData.body = sanitizeBody(contentData.body, isCreating);

  sanitizedData.contentType = sanitizeContentType(
    contentData.contentType,
    isCreating
  );

  return sanitizedData;
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
    if (topic.length < 3) {
      throw new BadRequestError('Topic must be at least 3 characters');
    }
    if (topic.length > 50) {
      throw new BadRequestError('Topic must be less than 50 characters');
    }
  }

  return topic;
}

function sanitizeTitle(
  title: string | undefined,
  isMandatory: boolean
): string | undefined {
  if (isMandatory && title === undefined) {
    throw new BadRequestError('Title is undefined');
  }

  if (title != null && title !== undefined && typeof title !== 'string') {
    throw new BadRequestError('Title is not a string');
  }

  if (title != null && title !== undefined) {
    title = title.trim();
    if (title.length < 3) {
      throw new BadRequestError('Title must be at least 3 characters');
    }
    if (title.length > 50) {
      throw new BadRequestError('Title must be less than 50 characters');
    }
  }

  return title;
}

function sanitizeBody(
  body: string | undefined,
  isMandatory: boolean
): string | undefined {
  if (isMandatory && body === undefined) {
    throw new BadRequestError('Body is undefined');
  }

  if (body != null && body !== undefined && typeof body !== 'string') {
    throw new BadRequestError('Body is not a string');
  }

  if (body != null && body !== undefined) {
    body = body.trim();
    if (body.length < 3) {
      throw new BadRequestError('Body must be at least 3 characters');
    }
    if (body.length > 500) {
      throw new BadRequestError('Body must be less than 500 characters');
    }
  }

  return body;
}

function sanitizeContentType(
  contentType: string | undefined,
  isMandatory: boolean
): string | undefined {
  if (isMandatory && contentType === undefined) {
    throw new BadRequestError('Content type is undefined');
  }

  if (
    contentType != null &&
    contentType !== undefined &&
    typeof contentType !== 'string'
  ) {
    throw new BadRequestError('Content type is not a string');
  }

  if (contentType != null && contentType !== undefined) {
    contentType = contentType.trim();
    if (contentType.length < 3) {
      throw new BadRequestError('Content type must be at least 3 characters');
    }
    if (contentType.length > 50) {
      throw new BadRequestError('Content type must be less than 50 characters');
    }
  }

  return contentType;
}
