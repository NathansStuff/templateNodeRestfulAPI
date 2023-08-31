import {
    createDocument,
    deleteDocumentById,
    findAllDocuments,
    findDocumentById,
    updateDocumentById,
} from './documentDal';
import { Document, DocumentWithId } from './documentType';

// Get all Documents
export async function getAllDocuments(): Promise<DocumentWithId[]> {
    const Documents = await findAllDocuments();
    return Documents;
}

// Get Document by id
export async function getDocumentById(id: string): Promise<DocumentWithId | null> {
    const Document = await findDocumentById(id);
    return Document;
}

// Create Document
export async function createNewDocument(Document: Document): Promise<DocumentWithId> {
    const newDocument = await createDocument(Document);
    return newDocument;
}

// Update Document
export async function updateDocument(id: string, updatedData: Partial<Document>): Promise<DocumentWithId | null> {
    const Document = await updateDocumentById(id, updatedData);
    return Document;
}

// Delete Document
export async function deleteDocument(id: string): Promise<void | null> {
    const response = await deleteDocumentById(id);
    return response;
}
