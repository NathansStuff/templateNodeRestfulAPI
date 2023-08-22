import { EAssetType } from '@/types/enums/EAssetType';
import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IAssetType {
    type: ECriteriaType.ACCEPTED_OPTIONS;
    options: EAssetType[];
}
