import { ERuleOptions } from './enums/ERuleOptions';
import { ICriteria } from './ICriteria';

export interface IRule {
    type: ERuleOptions;
    criteria: ICriteria;
}
