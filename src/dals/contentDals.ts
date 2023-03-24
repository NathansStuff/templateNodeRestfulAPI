import ContentModel from '../models/contentModel';
import { IContent } from '../types/IContent';

// Create new content
export async function createContent(
  contentData: Partial<IContent>
): Promise<IContent> {
  const content = new ContentModel(contentData);
  return await content.save();
}

// Find all content
export async function findContent(): Promise<IContent[]> {
  return await ContentModel.find();
}

// Find content by ID
export async function findContentById(
  contentId: string
): Promise<IContent | null> {
  return await ContentModel.findById(contentId);
}

// Update content by ID
export async function updateContentById(
  contentId: string,
  contentData: Partial<IContent>
): Promise<IContent | null> {
  return await ContentModel.findByIdAndUpdate(contentId, contentData, {
    new: true,
  });
}

// Delete content by ID
export async function deleteContentById(
  contentId: string
): Promise<IContent | null> {
  return await ContentModel.findByIdAndDelete(contentId);
}

// Find content by topic ID
export async function findContentByTopicId(
  topicId: string
): Promise<IContent[]> {
  return await ContentModel.find({ topic: topicId });
}
