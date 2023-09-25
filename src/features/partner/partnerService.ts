import {
    createPartner,
    deletePartnerById,
    findAllPartners,
    findPartnerByApiKey,
    findPartnerById,
    updatePartnerById,
} from './partnerDal';
import { Partner, PartnerWithId } from './partnerTypes';

// Get all partners
export async function getAllPartners(): Promise<PartnerWithId[]> {
    const Partners = await findAllPartners();
    return Partners;
}

// Get partner by id
export async function getPartnerById(id: string): Promise<PartnerWithId | null> {
    const partner = await findPartnerById(id);
    return partner;
}

// Create Partner
export async function createNewPartner(partner: Partner): Promise<PartnerWithId> {
    const newPartner = await createPartner(partner);
    return newPartner;
}

// Update partner
export async function updatePartner(id: string, updatedData: Partial<PartnerWithId>): Promise<PartnerWithId | null> {
    const partner = await updatePartnerById(id, updatedData);

    if (partner === null) return null;

    return partner;
}

// Delete Partner
export async function deletePartner(id: string): Promise<void | null> {
    const response = await deletePartnerById(id);
    return response;
}

// Get partner by api key
export async function getPartnerByApiKey(apiKey: string): Promise<PartnerWithId | null> {
    const partner = await findPartnerByApiKey(apiKey);
    return partner;
}
