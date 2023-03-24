import { model } from 'mongoose';
import ProgressSchema from '../schema/progressSchema';
import { IProgress } from '../types/IProgress';

const ProgressModel = model<IProgress>('Progress', ProgressSchema);

export default ProgressModel;
