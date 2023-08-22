import { EAssetCondition } from '@/types/enums/EAssetCondition';
import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IAssetCondition {
    type: ECriteriaType.ACCEPTED_OPTIONS;
    options: EAssetCondition[];
}
