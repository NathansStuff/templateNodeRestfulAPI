import { ISubmissionRequirementsModel } from './ISubmissionRequirements';
import {
    createSubmissionRequirements,
    deleteSubmissionRequirementsById,
    findAllSubmissionRequirementss,
    findSubmissionRequirementsById,
    updateSubmissionRequirementsById,
} from './submissionRequirementsDal';

// Get all SubmissionRequirementss
export async function getAllSubmissionRequirementss(): Promise<ISubmissionRequirementsModel[]> {
    const SubmissionRequirementss = await findAllSubmissionRequirementss();
    return SubmissionRequirementss;
}

// Get SubmissionRequirements by id
export async function getSubmissionRequirementsById(id: string): Promise<ISubmissionRequirementsModel | null> {
    const SubmissionRequirements = await findSubmissionRequirementsById(id);
    return SubmissionRequirements;
}

// Create SubmissionRequirements
export async function createNewSubmissionRequirements(
    SubmissionRequirements: ISubmissionRequirementsModel
): Promise<ISubmissionRequirementsModel> {
    const newSubmissionRequirements = await createSubmissionRequirements(SubmissionRequirements);
    return newSubmissionRequirements;
}

// Update SubmissionRequirements
export async function updateSubmissionRequirements(
    id: string,
    updatedData: Partial<ISubmissionRequirementsModel>
): Promise<ISubmissionRequirementsModel | null> {
    const SubmissionRequirements = await updateSubmissionRequirementsById(id, updatedData);
    return SubmissionRequirements;
}

// Delete SubmissionRequirements
export async function deleteSubmissionRequirements(id: string): Promise<void> {
    await deleteSubmissionRequirementsById(id);
}
