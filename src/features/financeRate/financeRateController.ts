import { Request, Response } from 'express';

import {
    createNewFinanceRate,
    getAllFinanceRates,
    getFinanceRateById,
    removeFinanceRate,
    updateFinanceRateData,
} from './financeRateService';

// Get all
export async function getAllFinanceRatesHandler(req: Request, res: Response): Promise<void> {
    const FinanceRates = await getAllFinanceRates();
    res.status(200).json(FinanceRates);
}

// Get  by id
export async function getFinanceRateByIdHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const FinanceRate = await getFinanceRateById(id);
    if (FinanceRate) {
        res.status(200).json(FinanceRate);
    } else {
        res.status(404).json({ error: 'Criteria group not found' });
    }
}

// Create
export async function createFinanceRateHandler(req: Request, res: Response): Promise<void> {
    const FinanceRateData = req.body;
    const newFinanceRate = await createNewFinanceRate(FinanceRateData);
    res.status(201).json(newFinanceRate);
}

// Update
export async function updateFinanceRateHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;
    const FinanceRate = await updateFinanceRateData(id, updatedData);
    if (FinanceRate) {
        res.status(200).json(FinanceRate);
    } else {
        res.status(404).json({ error: 'Criteria group not found' });
    }
}

// Delete
export async function deleteFinanceRateHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await removeFinanceRate(id);
    res.status(204).send();
}
