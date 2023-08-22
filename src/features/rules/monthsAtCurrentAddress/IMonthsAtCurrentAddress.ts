import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IMonthsAtCurrentAddress {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
