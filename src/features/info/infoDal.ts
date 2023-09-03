import { mongoDBConnect } from '@/middleware/mongoDbConnect';

import { InfoModel } from './infoModel';
import { Info, InfoWithId } from './infoType';

// Get all Infos
export async function findAllInfos(): Promise<InfoWithId[]> {
    await mongoDBConnect();
    return await InfoModel.find();
}

// Get Info by ID
export async function findInfoById(id: string): Promise<InfoWithId | null> {
    await mongoDBConnect();
    return await InfoModel.findById(id);
}

// Create a new Info
export async function createInfo(InfoData: Info): Promise<InfoWithId> {
    await mongoDBConnect();
    return await InfoModel.create(InfoData);
}

// Update Info by ID
export async function updateInfoById(
    id: string,
    updatedData: Partial<Info>
): Promise<InfoWithId | null> {
    await mongoDBConnect();
    return await InfoModel.findByIdAndUpdate(id, updatedData, { new: true });
}

// Delete Info by ID
export async function deleteInfoById(id: string): Promise<void | null> {
    await mongoDBConnect();
    return await InfoModel.findByIdAndDelete(id);
}
