import { Request, Response } from 'express';

import {
    createNewSubmissionRequirements,
    deleteSubmissionRequirements,
    getAllSubmissionRequirementss,
    getSubmissionRequirementsById,
    updateSubmissionRequirements,
} from './submissionRequirementsService';

// Get all SubmissionRequirementss
export async function getAllSubmissionRequirementssHandler(req: Request, res: Response): Promise<void> {
    const SubmissionRequirementss = await getAllSubmissionRequirementss();
    res.status(200).json(SubmissionRequirementss);
}

// Get SubmissionRequirements by id
export async function getSubmissionRequirementsByIdHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const SubmissionRequirements = await getSubmissionRequirementsById(id);
    if (SubmissionRequirements) {
        res.status(200).json(SubmissionRequirements);
    } else {
        res.status(404).json({ error: 'SubmissionRequirements not found' });
    }
}

// Create SubmissionRequirements
export async function createSubmissionRequirementsHandler(req: Request, res: Response): Promise<void> {
    const SubmissionRequirementsData = req.body;
    const newSubmissionRequirements = await createNewSubmissionRequirements(SubmissionRequirementsData);
    res.status(201).json(newSubmissionRequirements);
}

// Update SubmissionRequirements
export async function updateSubmissionRequirementsHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;
    const SubmissionRequirements = await updateSubmissionRequirements(id, updatedData);
    if (SubmissionRequirements) {
        res.status(200).json(SubmissionRequirements);
    } else {
        res.status(404).json({ error: 'SubmissionRequirements not found' });
    }
}

// Delete SubmissionRequirements
export async function deleteSubmissionRequirementsHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await deleteSubmissionRequirements(id);
    res.status(204).send();
}
