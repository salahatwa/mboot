import { ActionBuilder } from './dynamic-form/models/field-config.interface';

export class Operation {
    constructor(public action:ActionBuilder,public model: any) {
    }
}


export enum ActionType{
  ZIP='0',
  DOCUMENT='1',
  HTML='2'
}

export enum ActionStatus{
    VIEW='0',
    DOWNLOAD='1',
}
