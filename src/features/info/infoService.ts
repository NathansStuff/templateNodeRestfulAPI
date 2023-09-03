import {
    deleteVectors,
    embedAndUpsertVectors,
} from '@/features/pinecone/vector/vectorService';
import { VectorEmbedRequestType } from '@/features/pinecone/vector/vectorType';

import {
    createInfo,
    deleteInfoById,
    findAllInfos,
    findInfoById,
    updateInfoById,
} from './infoDal';
import { Info, InfoWithId } from './infoType';

// Utility function to save info to Pinecone
async function saveInfoToPinecone(info: InfoWithId): Promise<void> {
    const vector: VectorEmbedRequestType = {
        id: info._id.toString(),
        friendlyTitle: info.friendlyTitle,
        sourceLink: info.sourceLink,
        aiText: info.aiText,
        tokens: info.tokens,
        componentType: info.componentType,
        metadata: info.metadata,
    };

    const response = await embedAndUpsertVectors([vector], info.namespace);
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
    // Info has to be created to get an id which is used for the vector
    const savedInfo = await createInfo(Info);

    await saveInfoToPinecone(savedInfo);

    // Update Info to show it has been saved in Pinecone
    const savedInPineconeInfo = {
        ...Info,
        savedInPinecone: true,
    };

    const updatedInfo = await updateInfo(
        savedInfo._id.toString(),
        savedInPineconeInfo
    );
    if (updatedInfo) return updatedInfo;

    throw new Error('Error saving Info to Pinecone');
}

// Update Info
export async function updateInfo(
    id: string,
    updatedData: Partial<InfoWithId>
): Promise<InfoWithId | null> {
    const info = await updateInfoById(id, updatedData);

    if (info === null) return null;
    await saveInfoToPinecone(info);

    return info;
}

// Delete Info
export async function deleteInfo(id: string): Promise<void | null> {
    const info = await getInfoById(id);
    if (info === null) return null;

    const vectorIds = [info._id.toString()];
    await deleteVectors(vectorIds, info.namespace);

    const response = await deleteInfoById(id);
    return response;
}
