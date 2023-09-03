import { findInfoById } from '@/features/info/infoDal';

import {
    createDocument,
    deleteDocumentById,
    findAllDocuments,
    findDocumentById,
    updateDocumentById,
} from './documentDal';
import { Document, DocumentWithId, DocumentWithInfoIds } from './documentType';

// Get all Documents
export async function getAllDocuments(): Promise<DocumentWithId[]> {
    const Documents = await findAllDocuments();
    return Documents;
}

// Get Document by id
export async function getDocumentById(
    id: string
): Promise<DocumentWithId | null> {
    const Document = await findDocumentById(id);
    return Document;
}

// Create Document
export async function createNewDocument(
    Document: Document
): Promise<DocumentWithId> {
    const newDocument = await createDocument(Document);
    return newDocument;
}

// Update Document
export async function updateDocument(
    id: string,
    updatedData: Partial<Document>
): Promise<DocumentWithId | null> {
    const Document = await updateDocumentById(id, updatedData);
    return Document;
}

// Delete Document
export async function deleteDocument(id: string): Promise<void | null> {
    const response = await deleteDocumentById(id);
    return response;
}

// Get Document and all its Info
export async function getInfosByDocumentId(
    documentId: string
): Promise<DocumentWithInfoIds | null> {
    const document = await getDocumentById(documentId);

    if (!document) {
        return null; // Document not found
    }

    const associatedInfoIds = document.infoIds;

    // Fetch and return only the info objects associated with the document
    const associatedInfos = await Promise.all(
        associatedInfoIds.map((infoId) => findInfoById(infoId))
    );

    return {
        name: document.name,
        namespace: document.namespace,
        infoIds: associatedInfos,
    };
}
