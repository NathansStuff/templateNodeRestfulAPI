import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { EFinanceType } from '@/types/enums/EFinanceType';

export interface IFinanceType {
    type: ECriteriaType.ACCEPTED_OPTIONS;
    options: EFinanceType[];
}
