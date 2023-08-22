import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IAssetAgeAtEndOfLoan {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
