import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ESaleType } from '@/types/enums/ESaleType';

export interface ISaleType {
    type: ECriteriaType.ACCEPTED_OPTIONS;
    options: ESaleType[];
}
