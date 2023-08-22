import { mongoDBConnect } from '@/middleware/mongoDbConnect';

import { FinanceRateModel } from './financeRateModel';
import { IFinanceRateModel } from './IFinanceRate';

// Get all
export async function findAllFinanceRates(): Promise<IFinanceRateModel[]> {
    await mongoDBConnect();
    return await FinanceRateModel.find();
}

// Find a by its ID
export async function findFinanceRateById(id: string): Promise<IFinanceRateModel | null> {
    await mongoDBConnect();
    return await FinanceRateModel.findById(id);
}

// Create a new
export async function createFinanceRate(FinanceRateData: IFinanceRateModel): Promise<IFinanceRateModel> {
    await mongoDBConnect();
    return await FinanceRateModel.create(FinanceRateData);
}

// Update an existing
export async function updateFinanceRate(
    id: string,
    updateData: Partial<IFinanceRateModel>
): Promise<IFinanceRateModel | null> {
    await mongoDBConnect();
    return await FinanceRateModel.findByIdAndUpdate(id, updateData, { new: true });
}

// Delete a by its ID
export async function deleteFinanceRate(id: string): Promise<boolean> {
    await mongoDBConnect();
    const result = await FinanceRateModel.findByIdAndDelete(id);
    return result !== null;
}
