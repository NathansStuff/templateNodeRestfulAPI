import { Request, Response } from 'express';

import {
    createNewLender,
    deleteLender,
    getAllLenders,
    getLenderByCode,
    getLenderById,
    getLendersByName,
    updateLender,
} from './lenderService';

// Get all lenders
export async function getAllLendersHandler(req: Request, res: Response): Promise<void> {
    const lenders = await getAllLenders();
    res.status(200).json(lenders);
}

// Get lender by id
export async function getLenderByIdHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const lender = await getLenderById(id);
    if (lender) {
        res.status(200).json(lender);
    } else {
        res.status(404).json({ error: 'Lender not found' });
    }
}

// Get lender by code
export async function getLenderByCodeHandler(req: Request, res: Response): Promise<void> {
    const { code } = req.params;
    const lender = await getLenderByCode(code);
    if (lender) {
        res.status(200).json(lender);
    } else {
        res.status(404).json({ error: 'Lender not found' });
    }
}

// Get lenders by name
export async function getLendersByNameHandler(req: Request, res: Response): Promise<void> {
    const { name } = req.params;
    const lenders = await getLendersByName(name);
    if (lenders) {
        res.status(200).json(lenders);
    } else {
        res.status(404).json({ error: 'Lender not found' });
    }
}

// Create lender
export async function createLenderHandler(req: Request, res: Response): Promise<void> {
    const lenderData = req.body;
    const newLender = await createNewLender(lenderData);
    res.status(201).json(newLender);
}

// Update lender
export async function updateLenderHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;
    const lender = await updateLender(id, updatedData);
    if (lender) {
        res.status(200).json(lender);
    } else {
        res.status(404).json({ error: 'Lender not found' });
    }
}

// Delete lender
export async function deleteLenderHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await deleteLender(id);
    res.status(204).send();
}
