import { Response, Request } from 'express';
import {
  getTopics,
  createNewTopic,
  getTopicById,
  updateTopic,
  deleteTopic,
  getTopicsByCourseId,
} from '../services/topicService';

// @desc Get all Topics
// @route GET /api/topics
// @access Private
export async function getTopicsHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const topics = await getTopics();
  return res.status(200).json(topics);
}

// @desc Create a new Topic
// @route POST /api/topics
// @access Private
export async function createTopicHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const topicData = req.body;
  const newTopic = await createNewTopic(topicData);
  return res.status(201).json(newTopic);
}

// @desc Get a Topic by ID
// @route GET /api/topics/:id
// @access Private
export async function getTopicHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const topicId = req.params.id;
  const topic = await getTopicById(topicId);
  return res.status(200).json(topic);
}

// @desc Update a Topic by ID
// @route PUT /api/topics/:id
// @access Private
export async function updateTopicHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const topicId = req.params.id;
  const topicData = req.body;
  const updatedTopic = await updateTopic(topicId, topicData);
  return res.status(200).json(updatedTopic);
}

// @desc Delete a Topic by ID
// @route DELETE /api/topics/:id
// @access Private
export async function deleteTopicHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const topicId = req.params.id;
  await deleteTopic(topicId);
  return res.status(204).json({ message: 'Topic deleted successfully' });
}

// @desc Get all Topics by Course ID
// @route GET /api/topics/course/:courseId
// @access Private
export async function getTopicsByCourseIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const courseId = req.params.courseId;
  const topics = await getTopicsByCourseId(courseId);
  return res.status(200).json(topics);
}
