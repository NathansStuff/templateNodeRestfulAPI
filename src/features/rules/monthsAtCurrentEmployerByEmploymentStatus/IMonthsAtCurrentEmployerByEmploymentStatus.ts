import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { EEmploymentStatus } from '@/types/enums/EEmploymentStatus';

export interface IMonthsAtCurrentEmployerByEmploymentStatus {
    type: ECriteriaType.ACCEPTED_OPTIONS;
    maxRecord?: Record<EEmploymentStatus, number>;
}
