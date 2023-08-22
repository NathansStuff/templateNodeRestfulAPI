import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IMonthsAtCurrentEmployer {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
