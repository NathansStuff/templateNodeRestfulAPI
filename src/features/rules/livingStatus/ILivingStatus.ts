import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ELivingStatus } from '@/types/enums/ELivingStatus';

export interface ILivingStatus {
    type: ECriteriaType.ACCEPTED_OPTIONS;
    options: ELivingStatus[];
}
