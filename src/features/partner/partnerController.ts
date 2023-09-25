import { Request, Response } from 'express';

import { BadRequestError } from '@/exceptions/BadRequestError';
import { ParamsWithId } from '@/types';

import { createNewPartner, deletePartner, getAllPartners, getPartnerById, updatePartner } from './partnerService';
import { Partner, PartnerWithId } from './partnerTypes';

// Get all Partners
export async function getAllPartnersHandler(req: Request, res: Response<PartnerWithId[]>): Promise<void> {
    const Partners = await getAllPartners();
    res.status(200).json(Partners);
}

// Get Partner by id
export async function getPartnerByIdHandler(req: Request, res: Response<PartnerWithId>): Promise<void> {
    const safeId = ParamsWithId.parse(req.params);
    const response = await getPartnerById(safeId.id);
    if (!response) throw new BadRequestError('Partner not found');

    res.status(200).json(response);
}

// Create Partner
export async function createPartnerHandler(req: Request, res: Response<PartnerWithId>): Promise<void> {
    const safePartnerData = Partner.parse(req.body);
    const newPartner = await createNewPartner(safePartnerData);
    res.status(201).json(newPartner);
}

// Update Partner
export async function updatePartnerHandler(req: Request, res: Response<PartnerWithId>): Promise<void> {
    const safePartnerData = Partner.parse(req.body);
    const safeId = ParamsWithId.parse(req.params);

    const result = await updatePartner(safeId.id, safePartnerData);
    if (result) {
        res.status(200).json(result);
    } else {
        throw new BadRequestError('Partner not found');
    }
}

// Delete Partner
export async function deletePartnerByIdHandler(req: Request, res: Response<{ message: string }>): Promise<void> {
    const safeId = ParamsWithId.parse(req.params);
    const response = await deletePartner(safeId.id);
    if (response === null) throw new BadRequestError('Partner not found');
    const message = `Partner with id ${safeId.id} deleted`;
    res.status(204).json({ message });
}
