import {
  createContent,
  findContent,
  findContentById,
  updateContentById,
  deleteContentById,
  findContentByTopicId,
} from '../dals/contentDals';
import { IContent } from '../types/IContent';

// Create new content
export async function createNewContent(
  contentData: Partial<IContent>
): Promise<IContent> {
  const content = await createContent(contentData);
  return content;
}

// Get all content
export async function getAllContent(): Promise<IContent[]> {
  const contentList = await findContent();
  return contentList;
}

// Get content by ID
export async function getContentById(
  contentId: string
): Promise<IContent | null> {
  const content = await findContentById(contentId);
  return content;
}

// Update content by ID
export async function updateContent(
  contentId: string,
  contentData: Partial<IContent>
): Promise<IContent | null> {
  const updatedContent = await updateContentById(contentId, contentData);
  return updatedContent;
}

// Delete content by ID
export async function deleteContent(
  contentId: string
): Promise<IContent | null> {
  const deletedContent = await deleteContentById(contentId);
  return deletedContent;
}

// Get content by topic ID
export async function getContentByTopicId(
  topicId: string
): Promise<IContent[]> {
  const contentList = await findContentByTopicId(topicId);
  return contentList;
}
