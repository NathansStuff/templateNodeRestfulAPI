import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IDepositPercent {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
