import { mongoDBConnect } from '@/middleware/mongoDbConnect';

import { PartnerModel } from './partnerModel';
import { Partner, PartnerWithId } from './partnerTypes';

// Get all Partners
export async function findAllPartners(): Promise<PartnerWithId[]> {
    await mongoDBConnect();
    return await PartnerModel.find();
}

// Get Partner by ID
export async function findPartnerById(id: string): Promise<PartnerWithId | null> {
    await mongoDBConnect();
    return await PartnerModel.findById(id);
}

// Create a new Partner
export async function createPartner(PartnerData: Partner): Promise<PartnerWithId> {
    await mongoDBConnect();
    return await PartnerModel.create(PartnerData);
}

// Update Partner by ID
export async function updatePartnerById(id: string, updatedData: Partial<Partner>): Promise<PartnerWithId | null> {
    await mongoDBConnect();
    return await PartnerModel.findByIdAndUpdate(id, updatedData, { new: true });
}

// Delete Partner by ID
export async function deletePartnerById(id: string): Promise<void | null> {
    await mongoDBConnect();
    return await PartnerModel.findByIdAndDelete(id);
}

// Get Partner by API Key
export async function findPartnerByApiKey(apiKey: string): Promise<PartnerWithId | null> {
    await mongoDBConnect();
    return await PartnerModel.findOne({ apiKey });
}
