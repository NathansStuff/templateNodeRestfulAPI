import { IRatePolicyModel } from './IRatePolicy';
import {
    createRatePolicy,
    deleteRatePolicy,
    findAllRatePolicys,
    findRatePolicyById,
    updateRatePolicy,
} from './ratePolicyDal';

// Get all
export async function getAllRatePolicys(): Promise<IRatePolicyModel[]> {
    const RatePolicys = await findAllRatePolicys();
    return RatePolicys;
}

// Get  by id
export async function getRatePolicyById(id: string): Promise<IRatePolicyModel | null> {
    const RatePolicy = await findRatePolicyById(id);
    return RatePolicy;
}

// Get  by ids
export async function getRatePolicysByIds(ids: string[] | undefined): Promise<IRatePolicyModel[]> {
    if (!ids) {
        return [];
    }
    const RatePolicys = await Promise.all(ids.map((id) => findRatePolicyById(id)));
    return RatePolicys.filter((RatePolicy) => RatePolicy !== null) as IRatePolicyModel[];
}

// Create
export async function createNewRatePolicy(RatePolicy: IRatePolicyModel): Promise<IRatePolicyModel> {
    const newRatePolicy = await createRatePolicy(RatePolicy);
    return newRatePolicy;
}

// Update
export async function updateRatePolicyData(
    id: string,
    updatedData: Partial<IRatePolicyModel>
): Promise<IRatePolicyModel | null> {
    const RatePolicy = await updateRatePolicy(id, updatedData);
    return RatePolicy;
}

// Delete
export async function removeRatePolicy(id: string): Promise<void> {
    await deleteRatePolicy(id);
}
