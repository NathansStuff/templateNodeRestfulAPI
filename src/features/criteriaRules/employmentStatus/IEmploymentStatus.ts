import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { EEmploymentStatus } from '@/types/enums/EEmploymentStatus';

export interface IEmploymentStatus {
    type: ECriteriaType.ACCEPTED_OPTIONS;
    options: EEmploymentStatus[];
}
