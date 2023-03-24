import { model } from 'mongoose';
import CourseSchema from '../schema/courseSchema';
import { ICourse } from '../types/Learning/ICourse';

const CourseModel = model<ICourse>('Course', CourseSchema);

export default CourseModel;
