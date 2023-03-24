import { model } from 'mongoose';
import ProgressSchema from '../schema/progressSchema';
import { IProgress } from '../types/Learning/IProgress';

const ProgressModel = model<IProgress>('Progress', ProgressSchema);

export default ProgressModel;
