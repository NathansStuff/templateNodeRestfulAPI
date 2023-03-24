import { model } from 'mongoose';
import ContentSchema from '../schema/contentSchema';
import { IContent } from '../types/IContent';

const ContentModel = model<IContent>('Content', ContentSchema);

export default ContentModel;
