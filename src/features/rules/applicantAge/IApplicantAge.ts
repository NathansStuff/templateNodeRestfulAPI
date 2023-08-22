import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IApplicantAge {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
