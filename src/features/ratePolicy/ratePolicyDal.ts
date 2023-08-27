import { mongoDBConnect } from '@/middleware/mongoDbConnect';

import { IRatePolicyModel } from './IRatePolicy';
import { RatePolicyModel } from './ratePolicyModel';

// Get all
export async function findAllRatePolicys(): Promise<IRatePolicyModel[]> {
    await mongoDBConnect();
    return await RatePolicyModel.find();
}

// Find a by its ID
export async function findRatePolicyById(id: string): Promise<IRatePolicyModel | null> {
    await mongoDBConnect();
    return await RatePolicyModel.findById(id);
}

// Create a new
export async function createRatePolicy(RatePolicyData: IRatePolicyModel): Promise<IRatePolicyModel> {
    await mongoDBConnect();
    return await RatePolicyModel.create(RatePolicyData);
}

// Update an existing
export async function updateRatePolicy(
    id: string,
    updateData: Partial<IRatePolicyModel>
): Promise<IRatePolicyModel | null> {
    await mongoDBConnect();
    return await RatePolicyModel.findByIdAndUpdate(id, updateData, { new: true });
}

// Delete a by its ID
export async function deleteRatePolicy(id: string): Promise<boolean> {
    await mongoDBConnect();
    const result = await RatePolicyModel.findByIdAndDelete(id);
    return result !== null;
}
