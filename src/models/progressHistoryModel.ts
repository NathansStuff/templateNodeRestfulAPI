import { model } from 'mongoose';
import ProgressHistorySchema from '../schema/progressHistory';
import { IProgressHistory } from '../types/IProgressHistory';

const ProgressHistoryModel = model<IProgressHistory>(
  'ProgressHistory',
  ProgressHistorySchema
);

export default ProgressHistoryModel;
