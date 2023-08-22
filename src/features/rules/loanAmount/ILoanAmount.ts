import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface ILoanAmount {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
