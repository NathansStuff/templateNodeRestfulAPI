import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IMaxEnquiriesInThreeMonths {
    type: ECriteriaType.BELOW_MAX;
    max: number;
}
