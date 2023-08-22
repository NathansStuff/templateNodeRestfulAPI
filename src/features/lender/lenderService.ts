import { ILenderModel } from './ILender';
import {
    createLender,
    deleteLenderById,
    findAllLenders,
    findLenderByCode,
    findLenderById,
    findLendersByName,
    updateLenderById,
} from './lenderDal';

// Get all lenders
export async function getAllLenders(): Promise<ILenderModel[]> {
    const lenders = await findAllLenders();
    return lenders;
}

// Get lender by id
export async function getLenderById(id: string): Promise<ILenderModel | null> {
    const lender = await findLenderById(id);
    return lender;
}

// Get lenders by name
export async function getLendersByName(name: string): Promise<ILenderModel[] | null> {
    const lenders = await findLendersByName(name);
    return lenders;
}

// Get lender by code
export async function getLenderByCode(code: string): Promise<ILenderModel | null> {
    const lender = await findLenderByCode(code);
    return lender;
}

// Create lender
export async function createNewLender(lender: ILenderModel): Promise<ILenderModel> {
    const newLender = await createLender(lender);
    return newLender;
}

// Update lender
export async function updateLender(id: string, updatedData: Partial<ILenderModel>): Promise<ILenderModel | null> {
    const lender = await updateLenderById(id, updatedData);
    return lender;
}

// Delete lender
export async function deleteLender(id: string): Promise<void> {
    await deleteLenderById(id);
}
