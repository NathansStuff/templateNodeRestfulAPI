import { Request, Response } from 'express';

import { BadRequestError } from '@/exceptions/BadRequestError';
import { ParamsWithId } from '@/types/ParamsWithId';

import {
    createNewInfo,
    deleteInfo,
    getAllInfos,
    getInfoById,
    updateInfo,
} from './infoService';
import { Info, InfoWithId } from './infoType';

// Get all Infos
export async function getAllInfosHandler(
    req: Request,
    res: Response<InfoWithId[]>
): Promise<void> {
    const Infos = await getAllInfos();
    res.status(200).json(Infos);
}

// Get Info by id
export async function getInfoByIdHandler(
    req: Request<ParamsWithId, InfoWithId, object>,
    res: Response<InfoWithId>
): Promise<void> {
    const safeId = ParamsWithId.parse(req.params);
    const response = await getInfoById(safeId.id);
    if (!response) throw new BadRequestError('Info not found');

    res.status(200).json(response);
}

// Create Info
export async function createInfoHandler(
    req: Request<object, InfoWithId, Info>,
    res: Response<InfoWithId>
): Promise<void> {
    const safeInfoData = Info.parse(req.body);
    const newInfo = await createNewInfo(safeInfoData);
    res.status(201).json(newInfo);
}

// Update Info
export async function updateInfoHandler(
    req: Request<ParamsWithId, InfoWithId, Info>,
    res: Response<InfoWithId>
): Promise<void> {
    const safeInfoData = Info.parse(req.body);
    const safeId = ParamsWithId.parse(req.params);

    const result = await updateInfo(safeId.id, safeInfoData);
    if (result) {
        res.status(200).json(result);
    } else {
        throw new BadRequestError('Info not found');
    }
}

// Delete Info
export async function deleteInfoHandler(
    req: Request<ParamsWithId, object, object>,
    res: Response<{ message: string }>
): Promise<void> {
    const safeId = ParamsWithId.parse(req.params);
    const response = await deleteInfo(safeId.id);
    if (response === null) throw new BadRequestError('Info not found');
    const message = `Info with id ${safeId.id} deleted`;
    res.status(204).json({ message });
}
