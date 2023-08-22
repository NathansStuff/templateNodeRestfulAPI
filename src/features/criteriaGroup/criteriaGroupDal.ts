import { mongoDBConnect } from '@/middleware/mongoDbConnect';

import { CriteriaGroupModel } from './criteriaGroupModel';
import { ICriteriaGroupModel } from './ICriteria';

// Get all criteria groups
export async function findAllCriteriaGroups(): Promise<ICriteriaGroupModel[]> {
    await mongoDBConnect();
    return await CriteriaGroupModel.find();
}

// Find a criteria group by its ID
export async function findCriteriaGroupById(id: string): Promise<ICriteriaGroupModel | null> {
    await mongoDBConnect();
    return await CriteriaGroupModel.findById(id);
}

// Create a new criteria group
export async function createCriteriaGroup(criteriaGroupData: ICriteriaGroupModel): Promise<ICriteriaGroupModel> {
    await mongoDBConnect();
    return await CriteriaGroupModel.create(criteriaGroupData);
}

// Update an existing criteria group
export async function updateCriteriaGroup(
    id: string,
    updateData: Partial<ICriteriaGroupModel>
): Promise<ICriteriaGroupModel | null> {
    await mongoDBConnect();
    return await CriteriaGroupModel.findByIdAndUpdate(id, updateData, { new: true });
}

// Delete a criteria group by its ID
export async function deleteCriteriaGroup(id: string): Promise<boolean> {
    await mongoDBConnect();
    const result = await CriteriaGroupModel.findByIdAndDelete(id);
    return result !== null;
}
