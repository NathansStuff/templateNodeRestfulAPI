import { deleteVectors, embedAndUpsertVectors } from '@/features/pinecone/vector/vectorService';
import { VectorEmbedRequestType } from '@/features/pinecone/vector/vectorType';
import { getTokenCount } from '@/features/tiktoken/tiktokenService';
import { EAiInfoTemplate, EEmbedTemplate } from '@/types';
import { EModel } from '@/types/enums/EModel';

import { createInfo, deleteInfoById, findAllInfos, findInfoById, updateInfoById } from './infoDal';
import { Info, InfoRequest, InfoWithId } from './infoType';

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
export async function createNewInfo(infoRequest: InfoRequest): Promise<InfoWithId> {
    const infoObject = buildInfoObject(infoRequest);

    // Create and save the Info, then update its savedInPinecone property
    const savedInfo = await createInfo(infoObject);
    await saveInfoToPinecone(savedInfo);
    const updatedInfo = await updateInfoWithPineconeStatus(savedInfo);

    if (updatedInfo) return updatedInfo;
    throw new Error('Error saving Info to Pinecone');
}

// Update Info
export async function updateInfo(id: string, updatedData: Partial<InfoWithId>): Promise<InfoWithId | null> {
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

function buildInfoObject(infoRequest: InfoRequest): Info {
    const aiText = buildAiText(infoRequest.chunkedText, infoRequest.metadata.ai.aiTemplate);
    const aiTokens = getTokenCount(aiText, EModel.GPT35TURBO0613);
    const embeddedText = buildEmbeddedText(infoRequest.chunkedText, infoRequest.metadata.embedded.embeddedTemplate);

    return {
        ...infoRequest,
        metadata: {
            ...infoRequest.metadata,
            ai: {
                ...infoRequest.metadata.ai,
                aiTokens,
                aiText,
            },
            embedded: {
                ...infoRequest.metadata.embedded,
                embeddedText,
            },
        },
        savedInPinecone: false,
    };
}

async function updateInfoWithPineconeStatus(savedInfo: InfoWithId): Promise<InfoWithId | null> {
    const savedInPineconeInfo = {
        ...savedInfo,
        savedInPinecone: true,
    };

    return await updateInfo(savedInfo._id.toString(), savedInPineconeInfo);
}

async function saveInfoToPinecone(info: InfoWithId): Promise<void> {
    const vector: VectorEmbedRequestType = {
        ...info,
        id: info._id.toString(),
    };

    const response = await embedAndUpsertVectors([vector], info.namespace);
    if (response.upsertedCount !== 1) {
        throw new Error('Error saving Info vector to Pinecone');
    }
}

function buildAiText(text: string, aiTemplate: EAiInfoTemplate): string {
    // todo: based on aiTemplate, return different template
    const templateString = 'You are a robot. Here is the user question: {{QUESTION}}';
    const formattedTemplate = templateString.replace('{{QUESTION}}', text);
    console.log('todo: ', aiTemplate);
    return formattedTemplate;
}

function buildEmbeddedText(text: string, embeddedTemplate: EEmbedTemplate): string {
    // todo: based on embeddedTemplate, return different template
    const templateString = 'You are a robot. Here is the user question: QUESTION';
    const formattedTemplate = templateString.replace('{{QUESTION}}', text);
    console.log('todo: ', embeddedTemplate);
    return formattedTemplate;
}
