import { mongoDBConnect } from '@/middleware/mongoDbConnect';

import { ISubmissionRequirementsModel } from './ISubmissionRequirements';
import { SubmissionRequirementsModel } from './submissionRequirementsModel';

// Get all SubmissionRequirementss
export async function findAllSubmissionRequirementss(): Promise<ISubmissionRequirementsModel[]> {
    await mongoDBConnect();
    return await SubmissionRequirementsModel.find();
}

// Get SubmissionRequirements by ID
export async function findSubmissionRequirementsById(id: string): Promise<ISubmissionRequirementsModel | null> {
    await mongoDBConnect();
    return await SubmissionRequirementsModel.findById(id);
}

// Create a new SubmissionRequirements
export async function createSubmissionRequirements(
    SubmissionRequirementsData: ISubmissionRequirementsModel
): Promise<ISubmissionRequirementsModel> {
    await mongoDBConnect();
    return await SubmissionRequirementsModel.create(SubmissionRequirementsData);
}

// Update SubmissionRequirements by ID
export async function updateSubmissionRequirementsById(
    id: string,
    updatedData: Partial<ISubmissionRequirementsModel>
): Promise<ISubmissionRequirementsModel | null> {
    await mongoDBConnect();
    return await SubmissionRequirementsModel.findByIdAndUpdate(id, updatedData, { new: true });
}

// Delete SubmissionRequirements by ID
export async function deleteSubmissionRequirementsById(id: string): Promise<void> {
    await mongoDBConnect();
    await SubmissionRequirementsModel.findByIdAndDelete(id);
}

export default SubmissionRequirementsModel;
