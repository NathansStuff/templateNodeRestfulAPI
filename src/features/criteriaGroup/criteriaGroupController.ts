import { Request, Response } from 'express';

import {
    createNewCriteriaGroup,
    getAllCriteriaGroups,
    getCriteriaGroupById,
    removeCriteriaGroup,
    updateCriteriaGroupData,
} from './criteriaGroupService';

// Get all criteria groups
export async function getAllCriteriaGroupsHandler(req: Request, res: Response): Promise<void> {
    const criteriaGroups = await getAllCriteriaGroups();
    res.status(200).json(criteriaGroups);
}

// Get criteria group by id
export async function getCriteriaGroupByIdHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const criteriaGroup = await getCriteriaGroupById(id);
    if (criteriaGroup) {
        res.status(200).json(criteriaGroup);
    } else {
        res.status(404).json({ error: 'Criteria group not found' });
    }
}

// Create criteria group
export async function createCriteriaGroupHandler(req: Request, res: Response): Promise<void> {
    const criteriaGroupData = req.body;
    const newCriteriaGroup = await createNewCriteriaGroup(criteriaGroupData);
    res.status(201).json(newCriteriaGroup);
}

// Update criteria group
export async function updateCriteriaGroupHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;
    const criteriaGroup = await updateCriteriaGroupData(id, updatedData);
    if (criteriaGroup) {
        res.status(200).json(criteriaGroup);
    } else {
        res.status(404).json({ error: 'Criteria group not found' });
    }
}

// Delete criteria group
export async function deleteCriteriaGroupHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await removeCriteriaGroup(id);
    res.status(204).send();
}
