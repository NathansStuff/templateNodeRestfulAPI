import { findContentByTopicId } from '../dals/contentDals';
import { findProgressByUserAndCourse } from '../dals/progressDals';
import { findProgressHistoryByUserAndCourse } from '../dals/progressHistoryDals';
import { IContent } from '../types/IContent';
import { IProgress } from '../types/IProgress';
import { IProgressHistory } from '../types/IProgressHistory';
import { ITopic } from '../types/ITopic';
import { IUser } from '../types/IUser';
import { getCourseById } from './courseService';
import { getTopicsByCourseId } from './topicService';

async function determineTopicToFocusOn(
  topics: ITopic[] | null,
  progress: IProgress[],
  progressHistory: IProgressHistory[]
): Promise<ITopic | null> {
  // Implement logic to determine the topic to focus on based on user's progress and topic weighting.
  // This is a placeholder and should be replaced with your custom algorithm.
  if (topics == null || topics.length === 0) {
    return null;
  }
  return topics[0];
}

export async function generateContent(
  user: IUser,
  courseId: string
): Promise<string> {
  // Fetch the course
  const course = await getCourseById(courseId);

  // Fetch the topics for the course
  const topics = await getTopicsByCourseId(courseId);
  console.log('topics', topics);

  // Fetch the user's progress and progress history for the course
  const progress = await findProgressByUserAndCourse(user._id, courseId);
  console.log('progress', progress);
  const progressHistory = await findProgressHistoryByUserAndCourse(
    user._id,
    courseId
  );
  console.log('progressHistory', progressHistory);

  // Determine the topic to focus on
  const topicToFocusOn = await determineTopicToFocusOn(
    topics,
    progress,
    progressHistory
  );
  console.log('topicToFocusOn', topicToFocusOn);

  if (topicToFocusOn == null) {
    return '';
  }

  // Fetch the content for the chosen topic
  const content = await getContentByTopic(topicToFocusOn._id);
  console.log('&***', content);

  // Generate additional content using ChatGPT API
  // const chatGPTContent = await OpenAIApi.generateContent(content.content);

  // Return the generated content
  if (content == null) {
    return '';
  }
  return `content: ${content[0].body}`;
}

export async function getContentByTopic(
  topicId: string
): Promise<IContent[] | null> {
  return await findContentByTopicId(topicId);
}
