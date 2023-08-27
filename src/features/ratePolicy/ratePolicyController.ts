import { Request, Response } from 'express';

import {
    createNewRatePolicy,
    getAllRatePolicys,
    getRatePolicyById,
    removeRatePolicy,
    updateRatePolicyData,
} from './ratePolicyService';

// Get all
export async function getAllRatePolicysHandler(req: Request, res: Response): Promise<void> {
    const RatePolicys = await getAllRatePolicys();
    res.status(200).json(RatePolicys);
}

// Get  by id
export async function getRatePolicyByIdHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const RatePolicy = await getRatePolicyById(id);
    if (RatePolicy) {
        res.status(200).json(RatePolicy);
    } else {
        res.status(404).json({ error: 'Criteria group not found' });
    }
}

// Create
export async function createRatePolicyHandler(req: Request, res: Response): Promise<void> {
    const RatePolicyData = req.body;
    const newRatePolicy = await createNewRatePolicy(RatePolicyData);
    res.status(201).json(newRatePolicy);
}

// Update
export async function updateRatePolicyHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;
    const RatePolicy = await updateRatePolicyData(id, updatedData);
    if (RatePolicy) {
        res.status(200).json(RatePolicy);
    } else {
        res.status(404).json({ error: 'Criteria group not found' });
    }
}

// Delete
export async function deleteRatePolicyHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await removeRatePolicy(id);
    res.status(204).send();
}
