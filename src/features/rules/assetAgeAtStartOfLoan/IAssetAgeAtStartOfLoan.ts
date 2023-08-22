import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IAssetAgeAtStartOfLoan {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
