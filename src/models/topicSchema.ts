import { model } from 'mongoose';
import TopicSchema from '../schema/topicSchema';
import { ITopic } from '../types/Learning/ITopic';

const TopicModel = model<ITopic>('Topic', TopicSchema);

export default TopicModel;
