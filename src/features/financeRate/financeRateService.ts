import {
    createFinanceRate,
    deleteFinanceRate,
    findAllFinanceRates,
    findFinanceRateById,
    updateFinanceRate,
} from './financeRateDal';
import { IFinanceRateModel } from './IFinanceRate';

// Get all
export async function getAllFinanceRates(): Promise<IFinanceRateModel[]> {
    const FinanceRates = await findAllFinanceRates();
    return FinanceRates;
}

// Get  by id
export async function getFinanceRateById(id: string): Promise<IFinanceRateModel | null> {
    const FinanceRate = await findFinanceRateById(id);
    return FinanceRate;
}

// Get  by ids
export async function getFinanceRatesByIds(ids: string[] | undefined): Promise<IFinanceRateModel[]> {
    if (!ids) {
        return [];
    }
    const FinanceRates = await Promise.all(ids.map((id) => findFinanceRateById(id)));
    return FinanceRates.filter((FinanceRate) => FinanceRate !== null) as IFinanceRateModel[];
}

// Create
export async function createNewFinanceRate(FinanceRate: IFinanceRateModel): Promise<IFinanceRateModel> {
    const newFinanceRate = await createFinanceRate(FinanceRate);
    return newFinanceRate;
}

// Update
export async function updateFinanceRateData(
    id: string,
    updatedData: Partial<IFinanceRateModel>
): Promise<IFinanceRateModel | null> {
    const FinanceRate = await updateFinanceRate(id, updatedData);
    return FinanceRate;
}

// Delete
export async function removeFinanceRate(id: string): Promise<void> {
    await deleteFinanceRate(id);
}
