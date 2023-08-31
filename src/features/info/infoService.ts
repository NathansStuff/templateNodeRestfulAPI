import { createInfo, deleteInfoById, findAllInfos, findInfoById, updateInfoById } from './infoDal';
import { Info, InfoWithId } from './infoType';

// Get all Infos
export async function getAllInfos(): Promise<InfoWithId[]> {
    const Infos = await findAllInfos();
    return Infos;
}

// Get Info by id
export async function getInfoById(id: string): Promise<InfoWithId | null> {
    const Info = await findInfoById(id);
    return Info;
}

// Create Info
export async function createNewInfo(Info: Info): Promise<InfoWithId> {
    const newInfo = await createInfo(Info);
    return newInfo;
}

// Update Info
export async function updateInfo(id: string, updatedData: Partial<Info>): Promise<InfoWithId | null> {
    const Info = await updateInfoById(id, updatedData);
    return Info;
}

// Delete Info
export async function deleteInfo(id: string): Promise<void | null> {
    const response = await deleteInfoById(id);
    return response;
}
