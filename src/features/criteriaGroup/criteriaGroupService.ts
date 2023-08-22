import {
    createCriteriaGroup,
    deleteCriteriaGroup,
    findAllCriteriaGroups,
    findCriteriaGroupById,
    updateCriteriaGroup,
} from './criteriaGroupDal';
import { ICriteriaGroupModel } from './ICriteria';

// Get all criteria groups
export async function getAllCriteriaGroups(): Promise<ICriteriaGroupModel[]> {
    const criteriaGroups = await findAllCriteriaGroups();
    return criteriaGroups;
}

// Get criteria group by id
export async function getCriteriaGroupById(id: string): Promise<ICriteriaGroupModel | null> {
    const criteriaGroup = await findCriteriaGroupById(id);
    return criteriaGroup;
}

// Get criteria groups by ids
export async function getCriteriaGroupsByIds(ids: string[]): Promise<ICriteriaGroupModel[]> {
    const criteriaGroups = await Promise.all(ids.map((id) => findCriteriaGroupById(id)));
    return criteriaGroups.filter((criteriaGroup) => criteriaGroup !== null) as ICriteriaGroupModel[];
}

// Create criteria group
export async function createNewCriteriaGroup(criteriaGroup: ICriteriaGroupModel): Promise<ICriteriaGroupModel> {
    const newCriteriaGroup = await createCriteriaGroup(criteriaGroup);
    return newCriteriaGroup;
}

// Update criteria group
export async function updateCriteriaGroupData(
    id: string,
    updatedData: Partial<ICriteriaGroupModel>
): Promise<ICriteriaGroupModel | null> {
    const criteriaGroup = await updateCriteriaGroup(id, updatedData);
    return criteriaGroup;
}

// Delete criteria group
export async function removeCriteriaGroup(id: string): Promise<void> {
    await deleteCriteriaGroup(id);
}
