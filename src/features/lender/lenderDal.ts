import { mongoDBConnect } from '@/middleware/mongoDbConnect';

import { ILenderModel } from './ILender';
import { LenderModel } from './lenderModel';

// Get all lenders
export async function findAllLenders(): Promise<ILenderModel[]> {
    await mongoDBConnect();
    return await LenderModel.find();
}

// Get lenders by name
export async function findLendersByName(name: string): Promise<ILenderModel[] | null> {
    await mongoDBConnect();
    return await LenderModel.find({ name });
}

// Get lender by code
export async function findLenderByCode(code: string): Promise<ILenderModel | null> {
    await mongoDBConnect();
    return await LenderModel.findOne({ code });
}

// Get lender by ID
export async function findLenderById(id: string): Promise<ILenderModel | null> {
    await mongoDBConnect();
    return await LenderModel.findById(id);
}

// Create a new lender
export async function createLender(lenderData: ILenderModel): Promise<ILenderModel> {
    await mongoDBConnect();
    return await LenderModel.create(lenderData);
}

// Update lender by ID
export async function updateLenderById(id: string, updatedData: Partial<ILenderModel>): Promise<ILenderModel | null> {
    await mongoDBConnect();
    return await LenderModel.findByIdAndUpdate(id, updatedData, { new: true });
}

// Delete lender by ID
export async function deleteLenderById(id: string): Promise<void> {
    await mongoDBConnect();
    await LenderModel.findByIdAndDelete(id);
}

export default LenderModel;
