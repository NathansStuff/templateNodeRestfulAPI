import { embedOpenaiQuery } from '@/features/langchain/langchainService';
import { deleteVectors, upsertVector } from '@/features/pinecone/vector/pineconeVectorService';
import { UpsertRequest } from '@pinecone-database/pinecone';

import { createInfo, deleteInfoById, findAllInfos, findInfoById, updateInfoById } from './infoDal';
import { Info, InfoWithId } from './infoType';

// Utility function to save info to Pinecone
async function saveInfoToPinecone(info: Info): Promise<void> {
    const embed = await embedOpenaiQuery(info.text);
    const vector = {
        id: info.id,
        values: embed,
        metadata: info.metadata,
    };

    const vectorRequest: UpsertRequest = {
        vectors: [vector],
        namespace: info.namespace,
    };

    const response = await upsertVector(vectorRequest);
    if (response.upsertedCount !== 1) {
        throw new Error('Error saving Info vector to Pinecone');
    }
}

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
    await saveInfoToPinecone(Info);

    const savedInPinceoneInfo = {
        ...Info,
        savedInPinecone: true,
    };

    const savedInfo = await createInfo(savedInPinceoneInfo);
    if (savedInfo) return savedInfo;

    throw new Error('Error saving Info to Pinecone');
}

// Update Info
export async function updateInfo(id: string, updatedData: Partial<Info>): Promise<InfoWithId | null> {
    const info = await updateInfoById(id, updatedData);

    if (info === null) return null;
    await saveInfoToPinecone(info);

    return info;
}

// Delete Info
export async function deleteInfo(id: string): Promise<void | null> {
    const info = await getInfoById(id);
    if (info === null) return null;

    const vectorIds = [info.id];
    await deleteVectors(vectorIds, info.namespace);

    const response = await deleteInfoById(id);
    return response;
}
