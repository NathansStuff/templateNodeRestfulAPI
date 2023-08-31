import { mongoDBConnect } from '@/middleware/mongoDbConnect';

import { DocumentModel } from './documentModel';
import { Document, DocumentWithId } from './documentType';

// Get all Documents
export async function findAllDocuments(): Promise<DocumentWithId[]> {
    await mongoDBConnect();
    return await DocumentModel.find();
}

// Get Document by ID
export async function findDocumentById(id: string): Promise<DocumentWithId | null> {
    await mongoDBConnect();
    return await DocumentModel.findById(id);
}

// Create a new Document
export async function createDocument(DocumentData: Document): Promise<DocumentWithId> {
    await mongoDBConnect();
    return await DocumentModel.create(DocumentData);
}

// Update Document by ID
export async function updateDocumentById(id: string, updatedData: Partial<Document>): Promise<DocumentWithId | null> {
    await mongoDBConnect();
    return await DocumentModel.findByIdAndUpdate(id, updatedData, { new: true });
}

// Delete Document by ID
export async function deleteDocumentById(id: string): Promise<void | null> {
    await mongoDBConnect();
    return await DocumentModel.findByIdAndDelete(id);
}
