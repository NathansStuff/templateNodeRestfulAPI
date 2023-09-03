import { Request, Response } from 'express';

import { BadRequestError } from '@/exceptions/BadRequestError';
import { ParamsWithId } from '@/types/ParamsWithId';

import {
    createNewDocument,
    deleteDocument,
    getAllDocuments,
    getDocumentById,
    getInfosByDocumentId,
    updateDocument,
} from './documentService';
import { Document, DocumentWithId, DocumentWithInfoIds } from './documentType';

// Get all Documents
export async function getAllDocumentsHandler(
    req: Request,
    res: Response<DocumentWithId[]>
): Promise<void> {
    const Documents = await getAllDocuments();
    res.status(200).json(Documents);
}

// Get Document by id
export async function getDocumentByIdHandler(
    req: Request<ParamsWithId, DocumentWithId, object>,
    res: Response<DocumentWithId>
): Promise<void> {
    const safeId = ParamsWithId.parse(req.params);
    const response = await getDocumentById(safeId.id);
    if (!response) throw new BadRequestError('Document not found');

    res.status(200).json(response);
}

// Create Document
export async function createDocumentHandler(
    req: Request<object, DocumentWithId, Document>,
    res: Response<DocumentWithId>
): Promise<void> {
    const safeDocumentData = Document.parse(req.body);
    const newDocument = await createNewDocument(safeDocumentData);
    res.status(201).json(newDocument);
}

// Update Document
export async function updateDocumentHandler(
    req: Request<ParamsWithId, DocumentWithId, Document>,
    res: Response<DocumentWithId>
): Promise<void> {
    const safeDocumentData = Document.parse(req.body);
    const safeId = ParamsWithId.parse(req.params);

    const result = await updateDocument(safeId.id, safeDocumentData);
    if (result) {
        res.status(200).json(result);
    } else {
        throw new BadRequestError('Document not found');
    }
}

// Delete Document
export async function deleteDocumentHandler(
    req: Request<ParamsWithId, object, object>,
    res: Response<{ message: string }>
): Promise<void> {
    const safeId = ParamsWithId.parse(req.params);
    const response = await deleteDocument(safeId.id);
    if (response === null) throw new BadRequestError('Document not found');
    const message = `Document with id ${safeId.id} deleted`;
    res.status(204).json({ message });
}

// Get Document and all its Info
export async function getInfosByDocumentIdHandler(
    req: Request<ParamsWithId, DocumentWithInfoIds, object>,
    res: Response<DocumentWithInfoIds | null>
): Promise<void> {
    const safeId = ParamsWithId.parse(req.params);
    const response = await getInfosByDocumentId(safeId.id);
    if (!response) throw new BadRequestError('Document not found');

    res.status(200).json(response);
}
