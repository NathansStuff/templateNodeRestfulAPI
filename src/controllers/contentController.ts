import { Response, Request } from 'express';
import { sanitizeContent } from '../sanitizers/contentSanitizer';
import {
  getAllContent,
  createNewContent,
  getContentById,
  updateContent,
  deleteContent,
  getContentByTopicId,
} from '../services/contentService';

// @desc Get all content
// @route GET /api/content
// @access Private
export async function getAllContentHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const contentList = await getAllContent();
  return res.status(200).json(contentList);
}

// @desc Create new content
// @route POST /api/content
// @access Private
export async function createContentHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const sanitizedContent = sanitizeContent(req.body, true);
  const newContent = await createNewContent(sanitizedContent);
  return res.status(201).json(newContent);
}

// @desc Get content by ID
// @route GET /api/content/:id
// @access Private
export async function getContentHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const contentId = req.params.id;
  const content = await getContentById(contentId);
  return res.status(200).json(content);
}

// @desc Update content by ID
// @route PUT /api/content/:id
// @access Private
export async function updateContentHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const sanitizedContent = sanitizeContent(req.body, false);
  const updatedContent = await updateContent(req.body.id, sanitizedContent);
  return res.status(200).json(updatedContent);
}

// @desc Delete content by ID
// @route DELETE /api/content/:id
// @access Private
export async function deleteContentHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const contentId = req.params.id;
  await deleteContent(contentId);
  return res.status(204).json({ message: 'Content deleted successfully' });
}

// @desc Get content by topic ID
// @route GET /api/content/topic/:topicId
// @access Private
export async function getContentByTopicHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const topicId = req.params.topicId;
  const contentList = await getContentByTopicId(topicId);
  return res.status(200).json(contentList);
}
